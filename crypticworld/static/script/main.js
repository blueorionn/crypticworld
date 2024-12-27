// Theme detection and management class
class ThemeManager {
  constructor() {
    this.root = document.body;
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.toogleButton = document.getElementById('toogle-theme-button');

    // Initialize theme
    this.setInitialTheme();

    // Watch for system theme changes
    this.mediaQuery.addEventListener('change', () => this.#setTheme());

    // toogle theme of button click
    this.toogleButton.addEventListener('mousedown', () => this.toogleTheme());
  }

  #setTheme() {
    const isDarkMode = this.mediaQuery.matches;

    // Remove existing theme classes
    this.root.classList.remove('light', 'dark');

    // Add appropriate theme class
    this.root.classList.add(isDarkMode ? 'dark' : 'light');

    // Optionally store theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent('themechange', {
        detail: { theme: isDarkMode ? 'dark' : 'light' },
      })
    );
  }

  // Method to manually set theme
  setManualTheme(theme) {
    this.root.classList.remove('light', 'dark');
    this.root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  // Get current theme
  getCurrentTheme() {
    return this.root.classList.contains('dark') ? 'dark' : 'light';
  }

  // get localstorage
  setInitialTheme() {
    let currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      if (currentTheme == 'dark') {
        // if local storage has dark mode
        this.setManualTheme('dark');
      } else if (currentTheme == 'light') {
        // if local storage has light mode
        this.setManualTheme('light');
      }
    } else {
      this.#setTheme();
    }
  }

  // toogle theme
  toogleTheme() {
    if (this.getCurrentTheme() == 'dark') {
      this.setManualTheme('light');
    } else {
      this.setManualTheme('dark');
    }
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Toogle Sidebar
class SidebarManager {
  constructor() {
    this.sideBar = document.querySelector('aside[data-sidebar]');
    this.sideBarToogleButton = document.querySelector('button#sidebar-toogle-button');

    // If elements not in root exit
    if (!this.sideBar || !this.sideBarToogleButton) return;

    this.sideBarClasses = {
      showSideBar: 'display-sidebar',
      hideSideBar: 'hide-sidebar',
    };
    this.showclass = this.sideBarClasses.showSideBar;
    this.hideClass = this.sideBarClasses.hideSideBar;
    this.minWidthToDisplaySideBar = 1280;
    this.width = window.innerWidth;

    // set sidebar
    this.#setSideBar();

    // watch for width change
    window.addEventListener('resize', () => this.#setSideBar());

    // toogle sidebar
    this.sideBarToogleButton.addEventListener('mousedown', () => this.#setSideBar());

    // hide sidebar if clicked outside
    document.addEventListener('mousedown', (event) => this.#handleClickOutside(event));

    // toogle sidebar nav
    this.toogleSidebarNav();
  }

  #setSideBar() {
    if (this.width < this.minWidthToDisplaySideBar) {
      if (!this.sideBar.classList.contains(this.showclass)) {
        this.toogleSideBar();
      }
    } else {
      this.sideBar.classList.remove(this.hideClass);
    }
  }

  toogleSideBar() {
    // If width is greater than 1280
    if (this.width > this.minWidthToDisplaySideBar) return;

    if (this.sideBar.classList.contains(this.showclass)) {
      this.sideBar.classList.remove(this.showclass, this.hideClass);
      this.sideBar.classList.add(this.hideClass);
    } else {
      this.sideBar.classList.remove(this.showclass, this.hideClass);
      this.sideBar.classList.add(this.showclass);
    }
  }

  #handleClickOutside(event) {
    // If width is greater than 1280
    if (this.width > this.minWidthToDisplaySideBar) return;

    // Check if sidebar exists and is open
    if (this.sideBar.classList.contains(this.hideClass)) return;

    // Check if click is outside both sidebar and toggle button
    const isClickOutside = !this.sideBar.contains(event.target) && !this.sideBarToogleButton.contains(event.target);

    if (isClickOutside) {
      this.sideBar.classList.remove(this.showclass);
      this.sideBar.classList.add(this.hideClass);
    }
  }

  toogleSidebarNav() {
    const toogleSidebarHashLists = document.querySelectorAll('button[data-toogle-sidebar-hash-lists]');
    toogleSidebarHashLists.forEach(function (btn) {
      btn.addEventListener('mousedown', function () {
        const ele = btn.parentElement.nextElementSibling;
        let showClass = '_display-content',
          hideClass = '_hide-content',
          rotateClass = '_rotate-content';

        // toogle
        if (ele.classList.contains(hideClass)) {
          ele.classList.remove(showClass, hideClass);
          ele.classList.add(showClass);
          btn.children[0].classList.add(rotateClass);
        } else {
          ele.classList.remove(showClass, hideClass);
          ele.classList.add(hideClass);
          btn.children[0].classList.remove(rotateClass);
        }
      });
    });
  }
}

// Initalize sidebar manager.
const sidebarManager = new SidebarManager();

// Hash String
class HashString {
  constructor() {
    this.textArea = document.querySelector('textarea#input');
    this.outputElement = document.querySelector('textarea#output');
    this.url = '/api/generate_hash/';

    // if elements not in root exit
    if(!this.textArea || !this.outputElement) return;

    this.fetchData();
  }

  fetchData() {
    let timeOutId,
      delay = 250,
      textArea = this.textArea,
      url = this.url,
      output = this.outputElement;

    textArea.addEventListener('input', function (event) {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(fetchApi, delay);
    });

    // fetch from api
    function fetchApi() {
      let textData = textArea.value;
      let pageUrl = window.location.href.split('/'),
        algorithm = pageUrl[pageUrl.length - 1];

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: `${textData}`, hashing_algorithm: `${algorithm}`, encoding_format: 'utf-8' }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          output.textContent = `${data.result}`;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return function () {
      clearTimeout(timeOutId);
      textArea.removeEventListener('input', fetchApi);
    };
  }
}

// Initalize hashstring class if not in home page
const hashString = new HashString();

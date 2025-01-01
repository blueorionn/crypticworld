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
    this.sideBarToogleButton = document.querySelectorAll('button[data-sidebar-toogle-button]');

    // If elements not in root exit
    if (!this.sideBar || !this.sideBarToogleButton) return;

    this.sideBarClasses = {
      showSideBar: ['display-sidebar', 'flex'],
      hideSideBar: ['hide-sidebar', 'hidden'],
    };
    this.showclass = this.sideBarClasses.showSideBar;
    this.hideClass = this.sideBarClasses.hideSideBar;

    // toogle sidebar
    this.sideBarToogleButton.forEach((ele) => {
      ele.addEventListener('mousedown', () => this.toogleSideBar());
    });

    // toogle sidebar nav
    this.toogleSidebarNav();
  }

  toogleSideBar() {
    if (this.sideBar.classList.contains(...this.showclass)) {
      this.sideBar.classList.remove(...this.showclass, ...this.hideClass);
      this.sideBar.classList.add(...this.hideClass);
    } else {
      this.sideBar.classList.remove(...this.showclass, ...this.hideClass);
      this.sideBar.classList.add(...this.showclass);
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
    // variables
    this.textArea = document.querySelector('textarea#input');
    this.outputElement = document.querySelector('textarea#output');
    this.digestLenElement = document.querySelector('input#digest_len');
    this.encodingSelector = document.querySelector('select#encoding');
    this.url = '/api/generate_hash/';
    this.defaultDigestLen = 64;
    this.encodingMethod = 'utf-8';

    // if elements not in root exit
    if (!this.textArea || !this.outputElement) return;

    this.fetchData();

    // track digest len
    if (this.digestLenElement) {
      this.trackDigestLen();
    }

    if (this.encodingSelector) {
      this.trackEncodingMethod();
    }
  }

  trackDigestLen() {
    // current algorithm
    let pageUrl = window.location.href.split('/'),
      algorithm = pageUrl[pageUrl.length - 1];

    if (['shake_128', 'shake_256'].includes(algorithm)) {
      // set default value
      this.digestLenElement.value = this.defaultDigestLen;

      // watch for change
      this.digestLenElement.addEventListener('input', (event) => {
        this.defaultDigestLen = event.currentTarget.value;
      });
    }
  }

  trackEncodingMethod() {
    this.encodingSelector.addEventListener('change', (event) => {
      this.encodingMethod = event.currentTarget.value;
    });
  }

  fetchData() {
    let timeOutId,
      delay = 250,
      textArea = this.textArea,
      url = this.url,
      output = this.outputElement;

    // fetch from api
    const fetchApi = () => {
      let textData = textArea.value;
      let pageUrl = window.location.href.split('/'),
        algorithm = pageUrl[pageUrl.length - 1];

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `${textData}`,
          hashing_algorithm: `${algorithm}`,
          encoding_format: `${this.encodingMethod}`,
          digest_length: this.defaultDigestLen,
        }),
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
          output.textContent = `${error}`;
          console.error('Error:', error);
        });
    };

    // add event listner
    textArea.addEventListener('input', function (event) {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(fetchApi, delay);
    });

    if (this.digestLenElement) {
      this.digestLenElement.addEventListener('input', function (event) {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(fetchApi, delay);
      });
    }

    if (this.encodingSelector) {
      this.encodingSelector.addEventListener('change', () => {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(fetchApi, delay);
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

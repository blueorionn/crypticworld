// Theme manager
class ThemeManager {
  private root: HTMLElement;
  private mediaQuery: MediaQueryList;
  private toogleButton: HTMLButtonElement | null;

  constructor() {
    this.root = document.body;
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.toogleButton = document.querySelector('button#toogle-theme-button');

    // Initialize theme
    this.setInitialTheme();

    // Watch for system theme changes
    this.mediaQuery.addEventListener('change', () => this.setTheme());

    // toogle theme of button click
    if (!this.toogleButton) return;
    this.toogleButton.addEventListener('mousedown', () => this.toogleTheme());
  }

  // set theme utility function
  setTheme() {
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
  setManualTheme(theme: 'light' | 'dark') {
    this.root.classList.remove('light', 'dark');
    this.root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  // Get current theme
  getCurrentTheme() {
    return this.root.classList.contains('dark') ? 'dark' : 'light';
  }

  // set initial theme
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
      this.setTheme();
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

// Sidebar Manager
class SidebarManager {
  sideBar: HTMLElement | null;
  sideBarToogleButtons: NodeListOf<HTMLButtonElement>;
  sideBarClasses: {
    showSideBar: string[];
    hideSideBar: string[];
  };
  showClass: string[];
  hideClass: string[];

  constructor() {
    this.sideBar = document.querySelector('aside[data-sidebar]');
    this.sideBarToogleButtons = document.querySelectorAll('button[data-sidebar-toogle-button]');
    this.sideBarClasses = {
      showSideBar: ['display-sidebar'],
      hideSideBar: ['hide-sidebar', 'hidden'],
    };
    this.showClass = this.sideBarClasses.showSideBar;
    this.hideClass = this.sideBarClasses.hideSideBar;

    /**
     * add eventlistner to
     * show navbar toogle button
     * hide navbar toogle button
     */
    this.sideBarToogleButtons.forEach((ele) => {
      ele.addEventListener('mousedown', () => {
        this.toogleSideBar();
      });
    });

    // toogle submenu of algorithms in sidebar
    this.toogleSubMenuSideBar();
  }

  // toogle sidebar
  toogleSideBar() {
    if (!this.sideBar) return;

    if (this.sideBar.classList.contains(this.showClass.toString())) {
      this.sideBar.classList.remove(...this.showClass, ...this.hideClass);
      this.sideBar.classList.add(...this.hideClass);
    } else {
      this.sideBar.classList.remove(...this.showClass, ...this.hideClass);
      this.sideBar.classList.add(...this.showClass);
    }
  }

  // toogle sub menu of indivisual algorithm in sidebar.
  toogleSubMenuSideBar() {
    const toogleSidebarHashLists: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      'button[data-toogle-sidebar-hash-lists]'
    );

    toogleSidebarHashLists.forEach((btn) => {
      btn.addEventListener('mousedown', () => {
        const ele = btn.parentElement?.nextElementSibling;
        if (!ele) return;

        // element classes for toogle
        let showClass = '_display-content',
          hideClass = '_hide-content',
          rotateClass = '_rotate-content';

        // toogle sub menu of algorithm
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

// String Hasher
class HashString {
  inputTextArea: HTMLTextAreaElement | null;
  outputTextArea: HTMLTextAreaElement | null;
  digestLenElement: HTMLInputElement | null;
  encodingSelector: HTMLSelectElement | null;
  url = '/api/generate_hash/';
  digestLen = 64;
  encodingMethod = 'utf-8';

  constructor() {
    this.inputTextArea = document.querySelector('textarea#input');
    this.outputTextArea = document.querySelector('textarea#output');
    this.digestLenElement = document.querySelector('input#digest_len');
    this.encodingSelector = document.querySelector('select#encoding');

    // fetch data
    this.updateDataOnInputchange();

    // track digest length
    if (this.digestLenElement) {
      this.trackDigestLen();
    }

    // track encoding selector
    if (this.encodingSelector) {
      this.trackEncodingMethod();
    }
  }

  trackDigestLen() {
    // current algorithm
    let pageUrl = window.location.href.split('/'),
      algorithm = pageUrl[pageUrl.length - 1];

    if (['shake_128', 'shake_256'].includes(algorithm)) {
      // watch for change
      this.digestLenElement?.addEventListener('input', (event) => {
        this.digestLen = parseInt((event.target as HTMLInputElement).value) || this.digestLen;
      });
    }
  }

  trackEncodingMethod() {
    this.encodingSelector?.addEventListener('change', (event) => {
      this.encodingMethod = (event.currentTarget as HTMLInputElement).value;
    });
  }

  fetchData(url: string) {
    let textArea = this.inputTextArea,
      output = this.outputTextArea;
    let textData = textArea?.value;
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
        digest_length: this.digestLen,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (output) {
          output.textContent = `${data.result}`;
        }
      })
      .catch((error) => {
        if (output) {
          output.textContent = `${error}`;
        }
        console.error('Error:', error);
      });
  }

  updateDataOnInputchange() {
    let timeOutId: number,
      delay = 50,
      url = this.url;

    let textArea = this.inputTextArea;

    // handle change function
    const handleChange = () => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => this.fetchData(url), delay);
    };

    // add event listner
    textArea?.addEventListener('input', handleChange);

    if (this.digestLenElement) {
      this.digestLenElement.addEventListener('input', handleChange);
    }

    if (this.encodingSelector) {
      this.encodingSelector.addEventListener('change', handleChange);
    }

    return () => {
      clearTimeout(timeOutId);
      textArea?.removeEventListener('input', handleChange);
    };
  }
}

// Initalizing hashstring
const hashString = new HashString();

class FileManager {
  inputFile: HTMLInputElement | null;
  outputTextArea: HTMLTextAreaElement | null;
  displayFileName: HTMLParagraphElement | null;
  displayFileSize: HTMLParagraphElement | null;
  encodingSelector: HTMLSelectElement | null;
  digestLenElement: HTMLInputElement | null;
  hashButtonElement: HTMLButtonElement | null;
  url = '/api/file/generate_hash/';
  digestLen = 64;
  encodingMethod = 'utf-8';

  constructor() {
    this.inputFile = document.querySelector('input#dropzone-file');
    this.outputTextArea = document.querySelector('textarea#output');
    this.displayFileName = document.querySelector('p#display-file-name');
    this.displayFileSize = document.querySelector('p#display-file-size');
    this.encodingSelector = document.querySelector('select#encoding');
    this.digestLenElement = document.querySelector('input#digest_len');
    this.hashButtonElement = document.querySelector('button#hash_button');

    // If input file doesn't exist.
    if (!this.inputFile || !this.displayFileName || !this.displayFileSize) return;

    // track file change
    this.trackFileName();

    // track digest length
    if (this.digestLenElement) {
      this.trackDigestLen();
    }

    // track encoding selector
    if (this.encodingSelector) {
      this.trackEncodingMethod();
    }

    // display data
    this.updateDataOnFileChange();
  }

  trackDigestLen() {
    // current algorithm
    let pageUrl = window.location.href.split('/'),
      algorithm = pageUrl[pageUrl.length - 1];

    if (['shake_128', 'shake_256'].includes(algorithm)) {
      // watch for change
      this.digestLenElement?.addEventListener('input', (event) => {
        this.digestLen = parseInt((event.target as HTMLInputElement).value) || this.digestLen;
      });
    }
  }

  trackEncodingMethod() {
    this.encodingSelector?.addEventListener('change', (event) => {
      this.encodingMethod = (event.currentTarget as HTMLInputElement).value;
    });
  }

  trackFileName() {
    if (!this.inputFile) return;

    this.inputFile.addEventListener('input', () => {
      const fileList = this.inputFile?.files;
      if (!fileList?.length) return;

      // if file list.
      if (fileList[0].name && this.displayFileName) {
        const displayFileNameElement = this.displayFileName;
        displayFileNameElement.textContent = `${fileList[0].name}`;
      }

      // calculate file size.
      if (this.displayFileSize) {
        const displayFileSizeElement = this.displayFileSize;
        displayFileSizeElement.textContent = `${fileList[0].size} bytes`;
      }
    });
  }

  fetchData(url: string) {
    let output = this.outputTextArea;
    let pageUrl = window.location.href.split('/'),
      algorithm = pageUrl[pageUrl.length - 1];

    // file data
    const fileList = this.inputFile?.files;
    if (!fileList) return;

    // arranging data
    let data = new FormData();
    data.append('file', fileList[0]);
    data.append('hashing_algorithm', `${algorithm}`);
    data.append('encoding_format', `${this.encodingMethod}`);
    data.append('digest_length', `${this.digestLen}`);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
  }

  updateDataOnFileChange() {
    let url = this.url;

    this.hashButtonElement?.addEventListener('mousedown', () => {
      this.fetchData(url);
    });
  }
}

// Initializing filemanager.
const filemanager = new FileManager();
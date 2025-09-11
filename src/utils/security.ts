// Security utilities to protect against common attacks and dev tools access

export class SecurityManager {
  private static instance: SecurityManager;
  private devToolsOpen = false;
  private consoleBlocked = false;

  private constructor() {
    this.initSecurity();
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  private initSecurity() {
    // Block console access in production
    const isProduction = typeof window !== 'undefined' && 
      (window.location.hostname === 'ispora.com' || 
       window.location.hostname.includes('vercel.app'));
    
    if (isProduction) {
      this.blockConsole();
      this.detectDevTools();
      this.blockRightClick();
      this.blockKeyboardShortcuts();
      this.blockTextSelection();
    }
  }

  private blockConsole() {
    if (this.consoleBlocked) return;
    
    // Override console methods
    const noop = () => {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'trace', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'clear', 'table', 'assert'];
    
    methods.forEach(method => {
      (console as any)[method] = noop;
    });

    // Block console object access
    Object.defineProperty(window, 'console', {
      get: () => ({
        log: noop,
        debug: noop,
        info: noop,
        warn: noop,
        error: noop,
        trace: noop,
        dir: noop,
        dirxml: noop,
        group: noop,
        groupEnd: noop,
        time: noop,
        timeEnd: noop,
        count: noop,
        clear: noop,
        table: noop,
        assert: noop
      }),
      set: () => {}
    });

    this.consoleBlocked = true;
  }

  private detectDevTools() {
    let devtools = {
      open: false,
      orientation: null as string | null
    };

    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.onDevToolsDetected();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Additional detection methods
    let devtoolsChecker = {
      open: false,
      orientation: null as string | null
    };

    setInterval(() => {
      if (devtoolsChecker.open) {
        this.onDevToolsDetected();
      }
    }, 1000);

    // Detect F12, Ctrl+Shift+I, etc.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        this.onDevToolsDetected();
        return false;
      }
    });
  }

  private onDevToolsDetected() {
    if (this.devToolsOpen) return;
    
    this.devToolsOpen = true;
    
    // Clear the page content
    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #000;
        color: #fff;
        font-family: Arial, sans-serif;
        text-align: center;
      ">
        <div>
          <h1>Access Denied</h1>
          <p>Developer tools are not allowed on this website.</p>
          <p>Please close the developer tools and refresh the page.</p>
        </div>
      </div>
    `;
    
    // Disable all scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => script.remove());
  }

  private blockRightClick() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private blockKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Block Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U, F12
      if ((e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
          (e.ctrlKey && e.key === 'U') ||
          e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    });
  }

  private blockTextSelection() {
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    // CSS to prevent text selection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Method to allow text selection on specific elements
  public allowTextSelection(selector: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.userSelect = 'text';
      (htmlElement.style as any).webkitUserSelect = 'text';
      (htmlElement.style as any).mozUserSelect = 'text';
      (htmlElement.style as any).msUserSelect = 'text';
    });
  }
}

// Initialize security in production
const isProduction = typeof window !== 'undefined' && 
  (window.location.hostname === 'ispora.com' || 
   window.location.hostname.includes('vercel.app'));

if (isProduction) {
  const securityManager = SecurityManager.getInstance();
  
  // Allow text selection on form inputs
  setTimeout(() => {
    securityManager.allowTextSelection('input, textarea, [contenteditable]');
  }, 1000);
}

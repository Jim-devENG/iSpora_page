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
    
    // Only disable console in production, but don't completely block it
    // This prevents browser security warnings
    const originalConsole = { ...console };
    
    // Override console methods with warnings instead of complete blocking
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'trace', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'clear', 'table', 'assert'];
    
    methods.forEach(method => {
      (console as any)[method] = (...args: any[]) => {
        // Only show warning for first few calls
        if (Math.random() < 0.1) { // 10% chance to show warning
          originalConsole.warn('Console access is restricted on this site');
        }
      };
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
    
    // Just show a subtle warning instead of clearing the page
    const warning = document.createElement('div');
    warning.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(255, 0, 0, 0.9);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 12px;
      z-index: 10000;
      max-width: 200px;
    `;
    warning.textContent = 'Developer tools detected. Please close them for the best experience.';
    document.body.appendChild(warning);
    
    // Remove warning after 5 seconds
    setTimeout(() => {
      if (warning.parentNode) {
        warning.parentNode.removeChild(warning);
      }
    }, 5000);
  }

  private blockRightClick() {
    // Only block right-click on images and specific elements, not globally
    document.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement;
      // Only block on images and elements with data-protect attribute
      if (target.tagName === 'IMG' || target.hasAttribute('data-protect')) {
        e.preventDefault();
        return false;
      }
    });
  }

  private blockKeyboardShortcuts() {
    // Remove aggressive keyboard blocking that triggers security warnings
    // Only show subtle warnings instead
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12') {
        // Just show a subtle warning, don't block
        console.warn('Developer tools shortcut detected');
      }
    });
  }

  private blockTextSelection() {
    // Only prevent text selection on specific elements, not globally
    // This prevents browser security warnings
    const style = document.createElement('style');
    style.textContent = `
      /* Only block selection on specific elements */
      .no-select, [data-no-select] {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Ensure form inputs are always selectable */
      input, textarea, [contenteditable] {
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

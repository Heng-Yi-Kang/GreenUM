// For CSS Modules (if used)
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  // For Global CSS imports (like './App.css')
  declare module '*.css' {
    // In a standard Vite/React setup, the import usually handles the side-effect.
    // We just declare it to silence the TypeScript error.
  }
  
  // For SVG/PNG/JPEG imports (assets)
  // Vite often handles assets by returning the public URL as a string.
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  declare module '*.png' {
    const content: string;
    export default content;
  }
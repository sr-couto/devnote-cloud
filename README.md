`Status playground - Disclaimer: I'm learning Vue 😊.
That said - Feel free to use it for testing and learning purposes`

## Intro

DevNote is a `PWA` (Progressive Web App) for creating notes that uses the local storage capabilities of browsers to work without needing an internet connection after first load.

## Local Installation

```bash\"
git clone https://github.com/santuan/devnote
npm install
```

```bash\"
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint --fix",
    "devnote": "npm run build && npm run preview"
  },
```

### Developer mode
```bash\"
npm run dev
```

### Production mode

```bash\"
npm run build
npm run preview
```

## Disclaimer: This is way beyond my understanding :)

### Developer mode on StackBlitz (Experimental)

<a href="https://stackblitz.com/~/github.com/santuan/devnote?startScript=devnote">
  <img
    alt="Open in StackBlitz in developer mode"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>

<br/>

### Production mode on StackBlitz

Add `?startScript=devnote` to the StackBlitz url  


`https://stackblitz.com/~/github.com/santuan/devnote?startScript=devnote`


<br/>

<a href="https://stackblitz.com/~/github.com/santuan/devnote?startScript=devnote">
  <img
    alt="Open in StackBlitz in production mode"
    src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg"
  />
</a>

<br/>

Search for the `Open in a new tab` button and then click `connect to project` on the new created tab.

After that I suppose an indexdedDb is created on your Stackblitz session with it's own container in your own browser.

Something like this:

`https://devnote-????--4173--????????.[this i don't now how is generated].webcontainer.io/`

## ** Frontend && Backend **

### **Backend**

*   [Dexie.js](\"https://dexie.org/\") A minimalist wrapper for IndexedDB.
    
*   [RxJS](\"https://rxjs.dev/\") Reactive Extensions for modern JavaScript.
    

### Frontend

*   [Vue.js](\"https://vuejs.org/guide/introduction.html#what-is-vue\") 💚
    
*   [VueUse](\"https://vueuse.org/\") Utility collection for Vue.
    
*   [RadixVue](\"https://www.radix-vue.com/\") Accessible components for building design systems and web applications.
    
*   [Pinia](\"https://pinia.vuejs.org/\") State management.
    
*   [Shiki](\"https://shiki.style/guide/install\") Syntax highlighting.
    
*   [TailwindCSS](\"https://tailwindcss.com/\") 💙
    
*   [TipTap](\"https://tiptap.dev/product/editor\") Rich text editor.
    
*   [MediumZoom](\"https://github.com/francoischalifour/medium-zoom\") To enlarge images (preview mode only).
    
*   [Driver.js](\"https://driverjs.com/docs/installation\") For product tours.
    
*   [Vue-Sooner](\"https://vue-sonner.vercel.app/\") - Floating notifications.
    

## Keyboard Shortcuts

*   `Ctrl+Alt+P` Toggle between edit or preview mode.
    
*   `Ctrl+Alt+O` Command bar to navigate documents.
    
*   `Ctrl+M` Collapse menu.
    
*   `Ctrl+Alt+I` Import DB
    
*   `Ctrl+Alt+E` Export DB
    
*   `Ctrl+Alt+RightArrow` Expand edit area.
    
*   `Ctrl+Alt+LeftArrow` Collapse edit area.
    
*   `Shift+Delete` Delete current document
    

## **Rich Text Editor**

The app features a powerful rich text editor.

*   `Code blocks` - Syntax highlighting for over 250 languages.
    
*   `Text formatting` - links, bold, italic, underline, alignment, lists, quotes, and links.
    
*   `Images` Can be inserted as Base64 or via external URLs (not available offline)
    
*   `Videos` Can be embedded from YouTube or loaded by external URL (not available offline)
    

### **Interface**

*   Customizable color themes.
    
*   Light/Dark/System mode.
    
*   Quick navigation between notes with command bar and actions.
    
*   Document preview
    
*   Notifications
    

### **Additional Features**

*   Ability to copy and paste formatted text.
    
*   Database export and import in `json` format (only exports from the app).
    
*   Auto-save of documents once created.
    
*   Mark documents as `fixed` and `completed`.
    
*   [useMagicKeys](\"https://vueuse.org/core/useMagicKeys/\") Keyboard shortcuts for common actions.
    

### **Focus on Accessibility and UX**

Accessible components using Radix Vue.

*   `App scale` Change between 5 scales

*   `Focused elements` Design focused on highlighting
    
*   `Color contrasts` _Vizbug - In progress for all 5 themes in light/dark_
    
*   `ARIA` WAVE evaluation tool
    
*   `Responsive` Responsive design to adapt to all devices.
    
*   `Tooltips` for main actions.
    
*   `Focus Trap`
    
*   `Tabs` Navigation
    
*   `Esc` To close dialogs, dropdowns,
    
*   `Arrow keys` Move with arrow keys in menus and dropdowns (e.g., theme selector)
    

## Little big details 

*   Favicon changes with color theme.
    
*   Option to change mouse pointer.
    
*   Dragging files to the sidebar (exported from this app in `json` format) imports the database upon release.
    
*   When editing the DB name, clicking outside triggers the confirm function.
    
*   Device detection (Touch / mouse and keyboard) for hiding the cursor setting as well as the tour.
    
*   And more things that i can remember right now...

*   Have fun 🤓



### Fix Eslint and tailwind warning on vscode.

When using @apply (kind of its own language) eslint gives a warning.

.vscode > settings.json
.vscode > tailwind.json
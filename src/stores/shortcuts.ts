import { defineStore } from "pinia"

export const useShortcutsStore = defineStore("shortcuts", {
  state: () => ({
    shortcuts: {
      prevDocument: "ctrl+/",
      nextDocument: "ctrl+*",
    },
  }),
  persist: true,
  actions: {
    updateShortcut(action, shortcut) {
      this.shortcuts[action] = shortcut
    },
  },
})

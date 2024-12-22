export function useSetLink(editor: any) {
  const setLink = () => {
    const previousUrl = editor.value.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)
    if (url === null) return

    if (url === "") {
      editor.value.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      editor.value.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }

  return { setLink }
}

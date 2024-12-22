export function useSetVideo(editor) {
  const setVideo = () => {
    const videoSrc = window.prompt("Video URL", "")

    if (videoSrc === null) return

    if (videoSrc === "") {
      editor.value.isActive("video") ? editor.value.commands.deleteSelection() : false
      return
    }

    const srcCheck = videoSrc.match(/src="(?<src>.+?)"/)
    const src = srcCheck ? srcCheck.groups?.src : videoSrc

    editor.value.chain().focus().insertContent(`<video src="${src}"></video>`).run()
  }

  return { setVideo }
}

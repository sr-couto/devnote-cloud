export function useAddVideo(editor: any) {
  const addVideo = () => {
    const url = prompt("Ingresar URL del video de Youtube")
    if (url) {
      editor.value.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, 640),
        height: Math.max(180, 480),
      })
    }
  }

  return { addVideo }
}

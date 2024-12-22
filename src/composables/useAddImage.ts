export function useAddImage(editor: any) {
  const addImage = () => {
    const url = window.prompt("Ingresar URL de la imagen")
    if (url) {
      editor.value?.commands.setMedia({
        src: url,
        "media-type": "img",
        alt: "Something else",
        title: "Something",
        width: "800",
        height: "400",
      })
    }
  }

  return { addImage }
}

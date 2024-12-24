import { driver } from "driver.js"
import "driver.js/dist/driver.css"

function DriverJsInit() {
  const productTourSeen = localStorage.getItem("product_tour_seen") === "true"

  if (productTourSeen) {
    return
  }

  const driverObj = driver({
    allowClose: true,
    animate: false,
    stagePadding: 1,
    stageRadius: 2,
    nextBtnText: "Next",
    prevBtnText: "Previous",
    doneBtnText: "Start",
    popoverClass: "driverjs-theme",
    progressText: "{{current}} of {{total}}",
    showProgress: true,
    steps: [
      {
        popover: {
          title: "Welcome 👋",
          description:
            "This app is under development. Navigate the tutorial using the arrow keys. You can replay it from the settings.",
        },
      },
      {
        element: ".TextareaProjectName",
        popover: {
          title: "Document Title",
          description:
            "You can edit this text field to your liking with the name you prefer for later identification.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: ".EditorTiptap",
        popover: {
          title: "Text Editor",
          description:
            "Here you can add rich text, images, and videos from a URL, as well as YouTube videos.",
          side: "left",
          align: "center",
        },
      },
      {
        element: ".prose div.code-block.group:nth-of-type(1)",
        popover: {
          title: "Shiki for Code Highlighting",
          description: "Thanks to this, you can add beautiful code blocks for 295 languages.",
          side: "top",
          align: "start",
        },
      },

      // {
      //   element: '.GuardarDocumento',
      //   popover: {
      //     title: 'Add Document',
      //     description: 'To create a document, a title is minimally required. Click Save to add the document to the DB. Once the document is created, changes will be saved automatically.',
      //     side: 'top',
      //     align: 'center'
      //   }
      // },
      {
        element: ".SidebarProjects",
        popover: {
          title: "Created Documents",
          description:
            "Here, documents will be saved in your indexedDB. You can pin or mark them as completed.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: ".ToggleEditable",
        popover: {
          title: "Preview Mode",
          description:
            "Toggle between edit and preview mode for the document. Images can be enlarged in preview mode. Videos from URLs can only be played in this mode (for now).",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: ".ButtonDeleteDocument",
        popover: {
          title: "Delete Document",
          description: "If you wish, you can also delete the document directly.",
          side: "top",
          align: "center",
        },
      },
      {
        popover: {
          title: "All Set!",
          description: "Enjoy the experience!",
        },
      },
    ],

    onDestroyed: () => {
      localStorage.setItem("product_tour_seen", "true")
    },
  })

  driverObj.drive()
}

export default DriverJsInit

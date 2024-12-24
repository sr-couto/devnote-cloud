import { Minimize2 } from "lucide-vue-next"
import { Maximize2 } from "lucide-vue-next"
import { AlignCenterVertical, AlignEndVertical, AlignStartVertical } from "lucide-vue-next"

interface ResizableMediaAction {
  tooltip: string
  icon: any
  action?: (updateAttributes: (o: Record<string, any>) => any) => void
  isActive?: (attrs: Record<string, any>) => boolean
  delete?: (d: () => void) => void
}

export const resizableMediaActions: ResizableMediaAction[] = [
  {
    tooltip: "left",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "left",
        dataFullWidth: null,
      }),
    icon: AlignStartVertical,
    isActive: (attrs) => attrs.dataAlign === "left",
  },
  {
    tooltip: "center",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "center",
        dataFullWidth: null,
      }),
    icon: AlignCenterVertical,
    isActive: (attrs) => attrs.dataAlign === "center",
  },
  {
    tooltip: "right",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "right",
        dataFullWidth: null,
      }),
    icon: AlignEndVertical,
    isActive: (attrs) => attrs.dataAlign === "right",
  },
]

export const fullwidthMediaActions: ResizableMediaAction[] = [
  {
    tooltip: "fullwidth",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "left",
        dataFullWidth: true,
      }),
    icon: Maximize2,
  },
  {
    tooltip: "fullwidthcancel",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "left",
        dataFullWidth: false,
      }),
    icon: Minimize2,
  },
]

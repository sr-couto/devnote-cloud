<script setup>
import { ArrowRightToLine } from "lucide-vue-next"
import { shallowRef } from "vue"
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui"
import { useDocumentStore } from "@/stores/document"
import { useKeyModifier, useMagicKeys, whenever } from "@vueuse/core"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useDocumentStore()
const panelRef = shallowRef()
const layout = shallowRef(0)
const keys = useMagicKeys()
const ExpandAll = useKeyModifier("Control", { events: ["mouseup", "mousedown"] })
const magicExpandDocument = keys["ctrl+shift+alt+period"]

whenever(magicExpandDocument, (n) => {
  if (n) expandAllScreen()
})

function expandAllScreen() {
  if (panelRef.value.isCollapsed) {
    panelRef.value.expand()
  } else {
    panelRef.value.collapse()
  }
  if (ExpandAll.value === true) {
    document.show_sidebar_documents = !document.show_sidebar_documents
  }
}
</script>

<template>
  <SplitterGroup direction="horizontal" auto-save-id="splitter" @layout="layout = $event">
    <div :style="`flex: ${layout[1]} 1 0px; overflow: hidden;`" class="hidden lg:flex" />
    <SplitterPanel :min-size="80">
      <slot />
    </SplitterPanel>
    <SplitterResizeHandle
      class="hidden print:!hidden !select-none lg:flex group justify-center items-center w-8 border-l-2 border-secondary/10 data-[state=hover]:border-primary/90 data-[state=drag]:border-primary/90 data-[state=hover]:delay-700 data-[state=hover]:border-l-4 duration-100 focus:ring-primary focus:ring-1 outline-none"
    >
      <Tooltip
        :name="panelRef?.isCollapsed ? 'Collapse' : 'Expand'"
        :side="panelRef?.isCollapsed ? 'left' : 'right'"
        shortcut="ctrl shift alt ."
      >
        <button
          class="z-20 flex items-center !select-none justify-center bg-background size-6"
          @click="expandAllScreen"
          @keyup.enter="panelRef?.isCollapsed ? panelRef?.expand() : panelRef?.collapse()"
          :class="panelRef?.isCollapsed ? 'rotate-180' : ''"
        >
          <ArrowRightToLine class="delay-75 size-4 opacity-90" />
          <span class="sr-only">{{ panelRef?.isCollapsed ? "Collapse" : "Expand" }}</span>
        </button>
      </Tooltip>
    </SplitterResizeHandle>
    <SplitterPanel
      :max-size="20"
      :collapsed-size="0"
      ref="panelRef"
      collapsible
      @resize="resize = $event"
      class="hidden lg:flex"
    />
  </SplitterGroup>
</template>

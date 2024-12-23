<script setup>
import Sidebar from "@/components/TheSidebar.vue"
import Document from "@/components/Document.vue"
import { onMounted, watch } from "vue"
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
import { useSettingsStore } from "@/stores/settings"
import { useModalStore } from "@/stores/modal"
import { useMagicKeys, whenever } from "@vueuse/core"
import PullToRefresh from "@/components/ui/PullToRefresh.vue"

const settings = useSettingsStore()
const modal = useModalStore()

const counter = useCounterStore()
const { project_name, project_body } = storeToRefs(counter)

const keys = useMagicKeys()
const prevDoc = keys["ctrl+ArrowUp"]
const nextDoc = keys["ctrl+ArrowDown"]

// import { useShortcutsStore } from "@/stores/shortcuts"
// const shortcuts = useShortcutsStore()
// const prevDoc = computed(() => keys[shortcuts.shortcuts.prevDocument])
// const nextDoc = computed(() => keys[shortcuts.shortcuts.nextDocument])

whenever(prevDoc, () => {
  counter.navigateDocument("prev")
})

whenever(nextDoc, () => {
  counter.navigateDocument("next")
})

onMounted(() => {
  counter.init_database()
  counter.auto_save()
  if (settings.save_on_load) {
    modal.showShareModal = true
  }
})

watch(project_name, (v) => {
  if (v) counter.auto_save()
})

watch(project_body, (v) => {
  if (v) counter.auto_save()
})
</script>

<template>
  <PullToRefresh>
    <div class="flex w-full print:!h-auto print:!overflow-y-auto h-svh overflow-y-hidden">
      <Sidebar />
      <Document />
    </div>
  </PullToRefresh>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import Tooltip from "@/components/ui/Tooltip.vue"
import { Heading } from "lucide-vue-next"
import { useFocusStore } from "@/stores/focus"
import { useEditorStore } from "@/stores/editor"

const focus = useFocusStore()
const document = useEditorStore()
const counter = useCounterStore()
const { showEditorToolbar } = storeToRefs(document)
const { focusTitleTextarea } = storeToRefs(focus)
const { t } = useI18n()
</script>

<template>
  <div class="flex pt-1 items-start justify-between w-full gap-1 group relative md:!select-none">
    <!-- <span v-if="counter.project_name === ''" class="sr-only">{{ t('editor.untitled') }}</span>
    <span v-else class="sr-only">Document title: {{counter.project_name}}</span> -->
    <textarea
      :placeholder="counter.project_name === '' ? t('editor.untitled') : 'Document title'"
      autocomplete="off"
      spellcheck="false"
      ref="focusTitleTextarea"
      @keyup.ctrl.enter="counter.loaded_id ? null : counter.create_project()"
      v-model="counter.project_name"
      style="field-sizing: content"
      class="w-full pr-8 px-2 py-0.5 overflow-hidden ring-1 outline-none resize-none leading-8 max-h-9 md:max-h-auto min-h-8 create_project bg-secondary/30 text-foreground ring-secondary focus-within:ring-primary placeholder:text-primary/50 hover:ring-primary ring-inset focus:max-h-full line-clamp-1 focus:overflow-visible focus:line-clamp-none"
    />
    <Tooltip
      name="Toggle Toolbar"
      :side="'bottom'"
      :align="'end'"
      shortcut="ctrl shift alt &uarr; "
    >
      <button
        class="absolute font-serif top-0.5 md:top-1 right-0.5 md:right-0 size-9 flex justify-center items-center z-10 shrink-0 ring-1 ring-secondary ring-inset group-focus-within:ring-1 group-hover:ring-1 group-hover:ring-primary group-focus-within:ring-primary"
        :class="[
          counter.loaded_id ? '' : 'flex',
          showEditorToolbar ?
            ' bg-primary text-primary-foreground '
          : 'bg-secondary text-foreground',
        ]"
        @click="showEditorToolbar = !showEditorToolbar"
      >
        <span><Heading class="h-3" /></span>
      </button>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { useDatabaseStore } from "@/stores/database"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import Tooltip from "@/components/ui/Tooltip.vue"
import { Heading } from "lucide-vue-next"
import { useFocusStore } from "@/stores/focus"
import { useDocumentStore } from "@/stores/document"

const focus = useFocusStore()
const document = useDocumentStore()
const db_store = useDatabaseStore()
const { show_editor_toolbar } = storeToRefs(document)
const { focus_title_textarea } = storeToRefs(focus)
const { t } = useI18n()
</script>

<template>
  <div class="flex pt-1 items-start justify-between w-full gap-1 group relative md:!select-none">
    <textarea
      :placeholder="db_store.project_name === '' ? t('editor.untitled') : 'Document title'"
      autocomplete="off"
      spellcheck="false"
      ref="focus_title_textarea"
      @keyup.ctrl.enter="db_store.loaded_id ? null : db_store.create_project()"
      v-model="db_store.project_name"
      style="field-sizing: content"
      class="w-full pr-8 px-2 py-0.5 overflow-hidden ring-1 outline-none resize-none leading-8 max-h-9 md:max-h-auto min-h-8 TextareaProjectName bg-secondary/30 text-foreground ring-secondary focus-within:ring-primary placeholder:text-primary/50 hover:ring-primary ring-inset focus:max-h-full line-clamp-1 focus:overflow-visible focus:line-clamp-none"
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
          db_store.loaded_id ? '' : 'flex',
          show_editor_toolbar ?
            ' bg-primary text-primary-foreground '
          : 'bg-secondary text-foreground',
        ]"
        @click="show_editor_toolbar = !show_editor_toolbar"
      >
        <span><Heading class="h-3" /></span>
      </button>
    </Tooltip>
  </div>
</template>

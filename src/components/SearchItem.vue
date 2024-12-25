<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { Circle } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { useDatabaseStore } from "@/stores/database"
import { useDocumentStore } from "@/stores/document"
import { useEditorStore } from "@/stores/editor"
import { useI18n } from "vue-i18n"
import { useModalStore } from "@/stores/modal"
import { useUnsavedChanges } from "@/composables/useUnsavedChanges"
import Tooltip from "@/components/ui/Tooltip.vue"

const db_store = useDatabaseStore()
const document = useDocumentStore()
const editor_store = useEditorStore()
const modal = useModalStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater("lg")
const { loaded_id } = storeToRefs(db_store)
const { editor } = storeToRefs(editor_store)
const { hasUnsavedChanges } = useUnsavedChanges()
const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

function set_document(id) {
  db_store.select_id = id
  if (hasUnsavedChanges()) {
    modal.show_alert_unsaved_changes = true
    return
  }
  db_store.set_project(id)
  if (!largerThanLg.value) {
    document.show_sidebar_documents = false
  }
  editor.value.commands.focus()
  setTimeout(() => {
  }, 100)
}

function toggleCheck(item, isChecked) {
  db_store.change_project_checked(item, isChecked)
}
</script>

<template>
  <div class="relative flex items-center justify-between w-full pr-3 min-h-8 md:pr-2">
    <button
      class="flex interactive hover:!text-primary px-0.5 h-6 w-full items-center outline-none justify-start text-sm text-left focus-within:ring-1 ring-primary"
      :class="
        loaded_id === props.data.id ?
          'text-primary underline underline-offset-4 decoration-primary/50'
        : ''
      "
      @click="set_document(props.data.id)"
      @dblclick="document.toggle_editable()"
    >
      <span class="@sm:max-w-full max-w-80">
        <template v-if="props.data.project_data?.name">
          <span class="sr-only">{{ t("verb.open") }}</span>
          {{
            props.data.project_data?.name.length > 30 ?
              props.data.project_data?.name.substring(0, 30) + "&hellip;"
            : props.data.project_data?.name
          }}
          <span class="sr-only">document in editor</span>
        </template>
        <template v-else>
          <span class="opacity-50">{{ t("editor.untitled") }}</span>
        </template>
      </span>
    </button>

    <Tooltip side="top" :align="'end'" :name="t('sidebar.markAsDone')">
      <span>
        <label :for="'item-' + props.data.id" class="">
          <input
            type="checkbox"
            :id="'item-' + props.data.id"
            :checked="props.data.project_data?.checked"
            required
            class="sr-only peer"
            :aria-label="t('sidebar.markAsDone')"
            @change="toggleCheck(props.data, $event.target.checked)"
          />
          <div
            class="peer-focus:outline-none items-center size-7 md:size-6 flex justify-center rounded-full relative z-[50] mr-0.5 peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-primary"
          >
            <Circle class="size-5 md:size-4" />
          </div>
          <span class="sr-only">{{ t("sidebar.markAsDone") }}</span>
        </label>
      </span>
    </Tooltip>
  </div>
</template>

<script setup>
import Tooltip from "@/components/ui/Tooltip.vue"
import { useUnsavedChanges } from "@/composables/useUnsavedChanges"
import { useCounterStore } from "@/stores/counter"
import { storeToRefs } from "pinia"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useEditorStore } from "@/stores/editor"
import { useModalStore } from "@/stores/modal"

import { Circle, Pin, X } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const counter = useCounterStore()
const document = useEditorStore()
const modal = useModalStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater("lg")

const { loaded_id } = storeToRefs(counter)
const { editor } = storeToRefs(document)
const { hasUnsavedChanges } = useUnsavedChanges()
const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

function confirmSetDocument(id) {
  if (hasUnsavedChanges()) {
    counter.selectedId = id
    modal.showAlertUnsavedChanges = true
  } else {
    set_document(id)
  }
}

function set_document(id) {
  if (largerThanLg.value === true) {
    counter.set_project(id)
  } else {
    counter.set_project(id)
    counter.showSidebarDocuments = false
  }
  modal.showAlertUnsavedChanges = false
  setTimeout(() => {
    editor.value.commands.focus()
  }, 100)
}

function toggleCheck(item, isChecked) {
  counter.change_project_checked(item, isChecked)
}

function toggleFixed(item, isFixed) {
  counter.change_project_fixed(item, isFixed)
}
</script>

<template>
  <div class="relative flex items-center justify-between w-full pr-3 h-7 md:pr-2">
    <Tooltip
      side="top"
      :name="`${props.data.project_data?.fixed ? t('verb.unfixed') : t('verb.fixed')}`"
    >
      <div class="flex items-center">
        <button
          @click="toggleFixed(props.data, props.data.project_data?.fixed)"
          class="py-1 mx-0 outline-none md:py-0 w-6 h-6 ring-primary hover:text-primary focus-visible:ring-1 flex justify-center items-center"
        >
          <Pin
            class="origin-center -rotate-45 size-4"
            :class="props.data.project_data?.fixed ? 'fill-current text-primary' : ''"
          />
          <span class="sr-only">{{
            props.data.project_data?.fixed ? t("verb.unfixed") : t("verb.fixed")
          }}</span>
        </button>
      </div>
    </Tooltip>
    <button
      class="flex interactive hover:!text-primary px-2 h-6 w-full items-center outline-none justify-start text-sm text-left focus-within:ring-1 ring-primary"
      :class="loaded_id === props.data.id ? 'text-primary' : ''"
      @click="confirmSetDocument(props.data.id)"
      @dblclick="counter.toggleEditable()"
    >
      <span class="@sm:max-w-full max-w-80">
        <template v-if="props.data.project_data?.name">
          <span class="sr-only">{{ t("verb.open") }}</span>
          {{
            props.data.project_data?.name.length > 25 ?
              props.data.project_data?.name.substring(0, 25) + "&hellip;"
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

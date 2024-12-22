<script setup>
import Tooltip from "@/components/ui/Tooltip.vue"
import { useCounterStore } from "@/stores/counter"
import { Eye, PencilLine } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
const counter = useCounterStore()
const { t } = useI18n()
</script>

<template>
  <Tooltip
    shortcut="ctrl + alt + p"
    :name="`${counter.content_editable ? t('sidebar.contentPreview') : t('sidebar.contentEditable')}`"
    :side="counter.showSidebarDocuments ? 'bottom' : 'right'"
    :align="counter.showSidebarDocuments ? 'end' : 'center'"
  >
    <button
      @click="counter.toggleEditable"
      class="flex items-center justify-center border interactive border-secondary ToggleEditable bg-background hover:bg-secondary/80 size-8"
    >
      <Eye class="size-4" v-show="counter.content_editable" />
      <PencilLine class="size-4" v-show="!counter.content_editable" />
      <span class="sr-only">{{
        counter.content_editable ? t("sidebar.contentPreview") : t("sidebar.contentEditable")
      }}</span>
    </button>
  </Tooltip>
</template>

<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { storeToRefs } from "pinia"

import { Undo2 } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"
import { useEditorStore } from "@/stores/editor"
const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.undo')" side="bottom">
    <ToolbarButton
      class="flex items-center justify-center border outline-none size-8 focus-visible:border-primary border-secondary"
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
      :value="t('toolbar.undo')"
    >
      <Undo2 class="size-4" />
      <span class="sr-only">{{ t("toolbar.undo") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>

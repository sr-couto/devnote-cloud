<script setup lang="ts">
import { ToolbarButton } from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"

import { Bold, Italic, Strikethrough } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <Tooltip :name="t('toolbar.bold')" shortcut="Ctrl B" side="bottom">
    <ToolbarButton
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      class="interactive"
      :value="t('toolbar.bold')"
    >
      <Bold />
      <span class="sr-only">{{ t("toolbar.bold") }}</span>
    </ToolbarButton>
  </Tooltip>
  <Tooltip :name="t('toolbar.italic')" shortcut="Ctrl I" side="bottom">
    <ToolbarButton
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      class="interactive"
      :value="t('toolbar.italic')"
    >
      <Italic />
      <span class="sr-only">{{ t("toolbar.italic") }}</span>
    </ToolbarButton>
  </Tooltip>
  <Tooltip :name="t('toolbar.strike')" side="bottom" shortcut="Ctrl Shift S">
    <ToolbarButton
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      class="interactive"
      :value="t('toolbar.strike')"
    >
      <Strikethrough />
      <span class="sr-only">{{ t("toolbar.strike") }}</span>
    </ToolbarButton>
  </Tooltip>
</template>

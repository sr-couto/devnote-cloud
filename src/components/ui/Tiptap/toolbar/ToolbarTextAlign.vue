<script setup>
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ToolbarButton,
} from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"

import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Square } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <DropdownMenuRoot>
    <ToolbarButton as-child>
      <DropdownMenuTrigger>
        <Tooltip :name="t('toolbar.textAlign')" side="bottom">
          <span class="flex items-center justify-center w-full bg-secondary interactive h-full">
            <template v-if="editor.isActive({ textAlign: 'center' })">
              <AlignCenter class="size-6" />
            </template>
            <template v-else-if="editor.isActive({ textAlign: 'right' })">
              <AlignRight class="size-6" />
            </template>
            <template v-else-if="editor.isActive({ textAlign: 'justify' })">
              <AlignJustify class="size-6" />
            </template>
            <template v-else>
              <AlignLeft class="size-6" />
            </template>
            <span class="sr-only">{{ t("toolbar.textAlign") }}</span>
          </span>
        </Tooltip>
      </DropdownMenuTrigger>
    </ToolbarButton>
    <DropdownMenuContent
      align="start"
      side="bottom"
      :side-offset="6"
      class="z-50 grid w-32 text-xs bg-secondary border border-primary"
    >
      <DropdownMenuItem
        @click="editor.chain().focus().setTextAlign('left').run()"
        class="flex items-center justify-between gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 hover:bg-primary/20"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      >
        <div class="flex items-center justify-start gap-3 p-1">
          <AlignLeft class="size-4" />
          <span class="sr-only">{{ t("toolbar.alignLeft") }}</span>
        </div>
        <kbd
          class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
        >
          Ctrl Shift L
        </kbd>
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="editor.chain().focus().setTextAlign('center').run()"
        class="flex items-center justify-between gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 hover:bg-primary/20"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      >
        <div class="flex items-center justify-start gap-3 p-1">
          <AlignCenter class="size-4" />
          <span class="sr-only">{{ t("toolbar.alignCenter") }}</span>
        </div>
        <kbd
          class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
        >
          Ctrl Shift E
        </kbd>
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="editor.chain().focus().setTextAlign('right').run()"
        class="flex items-center justify-between gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 hover:bg-primary/20"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      >
        <div class="flex items-center justify-start gap-3 p-1">
          <AlignRight class="size-4" />
          <span class="sr-only">{{ t("toolbar.alignRight") }}</span>
        </div>
        <kbd
          class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
        >
          Ctrl Shift R
        </kbd>
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="editor.chain().focus().setTextAlign('justify').run()"
        class="flex items-center justify-between gap-2 p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 hover:bg-primary/20"
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
      >
        <div class="flex items-center justify-start gap-3 p-1">
          <AlignJustify class="size-4" />
          <span class="sr-only">{{ t("toolbar.alignJustify") }}</span>
        </div>
        <kbd
          class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium text-muted-foreground opacity-100"
        >
          Ctrl Shift J
        </kbd>
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="editor.chain().focus().unsetTextAlign().run()"
        class="flex items-center justify-between p-2 pr-3 bg-background outline-none focus-visible:bg-primary/30 hover:bg-primary/20"
      >
        <div class="flex items-center justify-start gap-3 p-1">
          <Square class="size-4" />
          <span class="sr-only">{{ t("toolbar.noAlignment") }}</span>
        </div>
        <kbd
          class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[8px] font-medium ml-auto text-muted-foreground opacity-100"
        >
          Ctrl Shift L
        </kbd>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

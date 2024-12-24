<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ToolbarButton,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "reka-ui"

import { useEditorStore } from "@/stores/editor"
import { storeToRefs } from "pinia"

import { Table } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import Tooltip from "@/components/ui/Tooltip.vue"

const document = useEditorStore()
const { editor } = storeToRefs(document)
const { t } = useI18n()
</script>

<template>
  <DropdownMenuRoot>
    <ToolbarButton as-child>
      <DropdownMenuTrigger
        class="data-[state=open]:!bg-primary data-[state=open]:text-primary-foreground relative"
      >
        <Tooltip
          :name="`${t('toolbar.table')} (experimental)`"
          :side="'bottom'"
          :align="'end'"
          shortcut="Right click on editor"
        >
          <span
            class="flex items-center justify-center outline-none interactive size-8 focus-visible:border-primary border-secondary"
          >
            <Table class="size-4 shrink-0" />
          </span>
          <span class="sr-only">{{ t("toolbar.table") }}</span>
        </Tooltip>
      </DropdownMenuTrigger>
    </ToolbarButton>
    <DropdownMenuPortal>
      <DropdownMenuContent
        :side="'bottom'"
        :side-offset="6"
        class="z-10 text-foreground font-mono grid p-1.5 text-xs border w-60 bg-background border-primary"
      >
        <DropdownMenuLabel
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20 text-primary"
        >
          {{ t("toolbar.table") }} (experimental)
        </DropdownMenuLabel>
        <DropdownMenuItem
          @click="
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          "
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
        >
          {{ t("toolbar.insertTable") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="editor.chain().focus().addColumnBefore().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().addColumnBefore()"
        >
          {{ t("toolbar.addColumnBefore") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="editor.chain().focus().addColumnAfter().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().addColumnAfter()"
        >
          {{ t("toolbar.addColumnAfter") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="editor.chain().focus().deleteColumn().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().deleteColumn()"
        >
          {{ t("toolbar.deleteColumn") }}
        </DropdownMenuItem>
        <DropdownMenuSeparator class="h-[0.0125rem] bg-secondary my-1" />
        <DropdownMenuItem
          @click="editor.chain().focus().addRowBefore().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().addRowBefore()"
        >
          {{ t("toolbar.addRowBefore") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="editor.chain().focus().addRowAfter().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().addRowAfter()"
        >
          {{ t("toolbar.addRowAfter") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="editor.chain().focus().deleteRow().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().deleteRow()"
        >
          {{ t("toolbar.deleteRow") }}
        </DropdownMenuItem>
        <DropdownMenuSeparator class="h-[0.0125rem] bg-secondary my-1" />
        <DropdownMenuItem
          @click="editor.chain().focus().deleteTable().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().deleteTable()"
        >
          {{ t("toolbar.deleteTable") }}
        </DropdownMenuItem>
        <DropdownMenuSeparator class="h-[0.0125rem] bg-secondary my-1" />
        <DropdownMenuItem
          @click="editor.chain().focus().mergeCells().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().mergeCells()"
        >
          {{ t("toolbar.mergeCells") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="editor.chain().focus().splitCell().run()"
          class="cursor-default flex items-center justify-between gap-2 p-2 pr-3 outline-none focus-visible:bg-primary/30 text-xs hover:bg-primary/20"
          :disabled="!editor.can().splitCell()"
        >
          {{ t("toolbar.splitCell") }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup>
import EditorCodeBlock from "@/components/ui/Tiptap/EditorCodeBlock.vue"
import Video from "./addVideo"

import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "reka-ui"

import Document from "@tiptap/extension-document"
import Blockquote from "@tiptap/extension-blockquote"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Italic from "@tiptap/extension-italic"
import Strike from "@tiptap/extension-strike"
import Bold from "@tiptap/extension-bold"
import BulletList from "@tiptap/extension-bullet-list"
import Underline from "@tiptap/extension-underline"
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Youtube from "@tiptap/extension-youtube"
import Gapcursor from "@tiptap/extension-gapcursor"
import Heading from "@tiptap/extension-heading"
import HardBreak from "@tiptap/extension-hard-break"
import Code from "@tiptap/extension-code"
import CodeBlockShiki from "tiptap-extension-code-block-shiki"
import { ResizableMedia } from "./resizableMedia"
import mediumZoom from "medium-zoom/dist/pure"
import "medium-zoom/dist/style.css"
import History from "@tiptap/extension-history"
import { onMounted, onBeforeUnmount } from "vue"
import { useDatabaseStore } from "@/stores/database"
import { useEditorStore } from "@/stores/editor"
import { useDocumentStore } from "@/stores/document"
import { storeToRefs } from "pinia"
import { Editor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3"
import { useI18n } from "vue-i18n"
import EditorContextMenu from "./EditorContextMenu.vue"
const db_store = useDatabaseStore()
const document = useDocumentStore()
const editor_store = useEditorStore()
const { editor } = storeToRefs(editor_store)
const { content_editable } = storeToRefs(document)
const { t } = useI18n()

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  toolbar: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
})

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      Document,
      Blockquote,
      BulletList,
      ListItem,
      Heading,
      HardBreak,
      Paragraph,
      HorizontalRule,
      Strike,
      Bold,
      Italic,
      Underline,
      Text,
      Code,
      History,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      ResizableMedia,
      // Image.configure({
      //   allowBase64: true,
      //   inline: true,
      //   HTMLAttributes: {
      //     class: "w-full my-6",
      //     "data-zoomable": "",
      //   },
      // }),
      Gapcursor,
      Video,
      Typography,
      Link.configure({
        openOnClick: true,
        defaultProtocol: "https",
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener",
          class: "px-1 underline-offset-2 text-primary cursor-pointer hover:text-primary/80",
        },
      }),
      Table.configure({
        resizable: false,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: t("editor.placeholder"),
      }),
      Youtube.configure({
        controls: true,
        ccLanguage: "es",
        nocookie: true,
      }),
      CodeBlockShiki.extend({
        addNodeView() {
          return VueNodeViewRenderer(EditorCodeBlock)
        },
      }).configure({
        HTMLAttributes: {
          spellcheck: "false",
        },
        defaultTheme: "houston",
      }),
    ],
    content: props.modelValue,
    editable: !props.editable,
    onCreate: () => {
      mediumZoom("[data-zoomable]", {
        margin: 12,
        background: "hsl(var(--background))",
        scrollOffset: 0,
      })
    },
    onUpdate: () => {
      // mediumZoom("[data-zoomable]", {
      //   margin: 12,
      //   background: "hsl(var(--background))",
      //   scrollOffset: 0,
      // });
      emit("update:modelValue", editor.value.getHTML())
    },
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<template>
  <div v-if="editor" class="EditorTiptap">
    <ScrollAreaRoot
      class="ScrollAreaEditor group"
      :class="[
        toolbar ? 'with-toolbar' : '',
        content_editable ? 'is-editable' : 'is-preview',
        db_store.loaded_id === '' || editor.isEmpty ? 'is-empty' : '',
      ]"
      style="--scrollbar-size: 10px"
    >
      <ScrollAreaViewport
        class="w-full h-full border-secondary border outline-none group-focus-within:ring-primary/70 group-focus-within:ring-1 focus:ring-inset focus:!ring-primary focus:!ring-1 group-focus-within:ring-inset"
      >
        <EditorContextMenu>
          <div class="max-w-full px-2 mx-auto prose dark:prose-invert" spellcheck="false">
            <slot />
            <editor-content :editor="editor" />
          </div>
        </EditorContextMenu>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar
        class="print:!hidden flex select-none touch-none p-0.5 bg-secondary transition-colors duration-[160ms] ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollAreaThumb
          class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
        />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
  </div>
</template>

<style>
.EditorTiptap {
  @apply grid w-full min-h-full;
}

[data-reka-scroll-area-viewport] {
  @apply print:!overflow-y-visible print:!border-0;
}

@media print {
  html {
    @apply !text-xs;
  }

  @page {
    @bottom-right {
      font-family: "JetBrains Mono Variable";
      margin: 0 0 10pt 0;
      font-size: 8pt;
      color: #333;
      content: counter(page) "-" counter(pages);
    }
  }

  h1 + p,
  h2 + p,
  h3 + p {
    page-break-before: avoid;
  }

  [data-reka-scroll-area-viewport] {
    --secondary: 240 4.8% 90.9%;
    @apply !overflow-y-visible !border;
  }

  .tiptap td,
  .tiptap th {
    @apply !border !border-muted/20;
  }

  h2,
  h3,
  h4 {
    page-break-after: avoid;
  }

  pre,
  blockquote {
    page-break-inside: avoid;
  }
}

.ScrollAreaEditor {
  @apply w-full scrollbar-none border-0 print:!h-full print:!max-h-none overflow-x-hidden print:!overflow-y-auto;
  

  &.is-editable {
    @apply max-h-[calc(100dvh-3rem)] bg-secondary/30 ;

    .tiptap td,
    .tiptap th {
      @apply !border-secondary/50 border-4 p-0;
    }
  }

  &.with-toolbar {
    @apply max-h-[calc(100dvh-7rem)] md:max-h-[calc(100dvh-5rem)];
  }

  &.is-preview {
    @apply max-h-screen bg-background;

    .tiptap td,
    .tiptap th {
      @apply !border-secondary/20 border-4 p-0;
    }

    .ProseMirror-trailingBreak,
    .ProseMirror-separator {
      @apply !hidden;
    }
  }
}

.tiptap {
  @apply p-1 md:p-4 md:pt-0 outline-none placeholder:text-primary min-h-[80dvh];
  /* @apply font-mono font-normal; */
  @apply font-serif;
}

.tiptap table:first-of-type,
.tiptap h1:first-of-type,
.tiptap h2:first-of-type,
.tiptap h3:first-of-type,
.tiptap h4:first-of-type,
.tiptap h5:first-of-type,
.tiptap h6:first-of-type {
  @apply mt-4;
}

.tiptap p a span {
  @apply !text-inherit;
}

.tiptap p {
  @apply break-words;
  hyphens: auto;
}

.tiptap p:has(img) {
  margin: 0;
}

.tiptap p:has(img) img {
  margin: 0;
}

.tiptap p a {
  @apply break-all underline-offset-4 decoration-dotted print:decoration-solid underline;
}

.tiptap pre {
  @apply my-0;
}

.tiptap p code {
  @apply bg-primary/20 break-all px-1 mx-0.5 rounded py-0.5 text-foreground ring-1 ring-primary/30 font-light text-sm;
  @apply print:!bg-primary/20 print:rounded-none print:ring-0;
}

.medium-zoom--opened .medium-zoom-overlay {
  z-index: 99;
}

.medium-zoom-image--opened {
  z-index: 100;
  margin: 0;
}

.medium-zoom-image {
  transition: transform 0.6s cubic-bezier(0.2, 0, 0.2, 1) !important;
}

.tiptap code::after,
.tiptap code::before {
  display: none;
}

html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  /* Optional, if you also want font styles */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
  @apply text-foreground/50;
}

/* Bubble menu */
.bubble-menu {
  @apply bg-secondary border border-secondary p-1 flex text-xs gap-2 items-center;
}

.bubble-menu button {
  background-color: unset;
  @apply h-8 px-2;
}

.bubble-menu button:hover {
  @apply bg-background;
}

.bubble-menu.is-active {
  background-color: var(--purple);
}

.bubble-menu.is-active:hover {
  background-color: var(--purple-contrast);
}

.tiptap iframe {
  @apply max-w-3xl mx-auto bg-primary/20 relative w-full h-96 aspect-video z-20;
}

.tiptap .ProseMirror-gapcursor {
  @apply w-0.5 h-6 bg-primary -translate-x-3;
}

/* 
.tiptap ::before {
  content: "";
  @apply absolute inset-0 bg-primary/10 mix-blend-multiply z-10;
} */

.tiptap table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.tiptap td,
.tiptap th {
  @apply border border-muted focus-visible:bg-red-600;
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.tiptap th {
  background-color: var(--gray-1);
  font-weight: bold;
  text-align: left;
}

.tiptap .selectedCell:after {
  @apply bg-primary/20 ring-1 ring-primary/50;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.tiptap .column-resize-handle {
  background-color: var(--purple);
  bottom: -2px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
}

.tiptap .tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.tiptap table iframe {
  @apply w-full max-w-full;
}

.tiptap.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

/* .tiptap img {
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
} */

.tiptap .ProseMirror-selectednode {
  @apply ring-2 ring-primary border-secondary/5 border-2;
}

.is-editable .tiptap .media-node-view {
  @apply border-primary/5 border-2 bg-primary/[0.0005];
}

.is-editable .tiptap .media-node-view.ProseMirror-selectednode {
  @apply !ring-0 !ring-transparent bg-primary/[0.02] border-2 border-primary border-dashed;
}

.tiptap li p {
  @apply m-0;
}
</style>

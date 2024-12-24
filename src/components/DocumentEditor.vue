<script setup>
import { storeToRefs } from "pinia"
import { useDatabaseStore } from "@/stores/database"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"
import { useIsMobile } from "@/composables/useIsMobile"
import { useSettingsStore } from "@/stores/settings"
import Editor from "@/components/ui/Tiptap/EditorTipTap.vue"
import EditorTitle from "@/components/ui/Tiptap/EditorTitle.vue"
import EditorToolbar from "@/components/ui/Tiptap/EditorToolbar.vue"
import SplashScreen from "@/components/ui/SplashScreen.vue"

const settings = useSettingsStore()
const db_store = useDatabaseStore()
const document = useDocumentStore()
const { content_editable, show_editor_toolbar } = storeToRefs(document)
const { isMobile } = useIsMobile()
const { t } = useI18n()
</script>

<template>
  <div :key="db_store.loaded_id">
    <article class="editor">
      <div
        class="editor-top"
        v-if="content_editable"
      >
        <EditorTitle />
        <EditorToolbar v-if="show_editor_toolbar" />
        <button
          @click="db_store.create_project()"
          v-show="!db_store.loaded_id"
          v-if="document.content_editable"
          :disabled="db_store.project_name === ''"
          :class="
            db_store.project_name ?
              'bg-primary text-primary-foreground hover:bg-primary/80'
            : 'disabled bg-secondary pointer-events-none'
          "
          class="md:hidden !select-none z-20 h-12 px-3 text-xs text-center w-full GuardarDocumento disabled:text-foreground/50 focus:bg-primary/50"
        >
          {{ t("editor.save") }}
        </button>
      </div>
      <Editor
        v-model="db_store.project_body"
        :editable="!document.content_editable"
        :toolbar="show_editor_toolbar"
      >
        <h2
          v-show="!content_editable"
          class="px-0 md:pl-5 md:p-4 mb-0 font-serif text-4xl md:text-5xl text-foreground font-black text-balance"
          :class="settings.show_heading_one_preview ? '' : 'sr-only'"
        >
          {{ db_store.project_name }}
        </h2>
      </Editor>
      <SplashScreen v-if="db_store.loaded_id === '' && content_editable === false" />
    </article>
    <button
      @click="db_store.create_project()"
      v-show="!db_store.loaded_id"
      v-if="content_editable"
      :disabled="db_store.project_name === ''"
      :class="
        db_store.project_name ?
          'bg-primary text-primary-foreground hover:bg-primary/80'
        : 'disabled bg-secondary pointer-events-none'
      "
      class="hidden md:block fixed !select-none bottom-0 right-0 z-20 h-12 px-3 text-xs text-right left-0 GuardarDocumento disabled:text-foreground/50 focus:bg-primary/50"
    >
      <kbd
        v-show="!isMobile"
        class="pointer-events-none uppercase inline-flex h-6 mr-3 [:disabled_&]:!text-foreground/70 scale-75 origin-right select-none items-center gap-1 rounded bg-primary/20 px-1.5 font-mono text-xs text-primary-foreground font-extrabold opacity-100"
      >
        ctrl enter
      </kbd>
      {{ t("editor.save") }}
    </button>
  </div>
</template>

<style scoped>
.editor {
  @apply relative mx-auto lg:w-full px-2 print:grid-rows-none;
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
}

.editor-top {
  @apply bg-background z-50;
}
</style>

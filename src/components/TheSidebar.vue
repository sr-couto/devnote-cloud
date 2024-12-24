<script setup lang="ts">
import SidebarTop from "@/components/SidebarTop.vue"
import SidebarProjects from "@/components/SidebarProjects.vue"

import { shallowRef } from "vue"
import { storeToRefs } from "pinia"
import { useDocumentStore } from "@/stores/document"
import { useI18n } from "vue-i18n"

const document = useDocumentStore()
const dropZoneRef = shallowRef()
const { show_sidebar_documents } = storeToRefs(document)
const { t } = useI18n()

</script>

<template>
  <div>
    <header
      ref="dropZoneRef"
      class="fixed top-0 print:hidden z-[60] !select-none flex flex-col justify-start h-screen border-r lg:sticky bg-background border-secondary focus-within:ring-1 focus-within:ring-primary/50"
      :class="show_sidebar_documents ? 'min-w-80 max-w-80' : ' '"
    >
      <SidebarTop />
      <SidebarProjects v-show="show_sidebar_documents" />
    </header>
    <button
      v-show="show_sidebar_documents"
      @click="show_sidebar_documents = !show_sidebar_documents"
      class="fixed inset-0 print:hidden !z-[51] bg-background/90 !border-0 !ring-0 !outline-none lg:hidden"
    >
      <span class="sr-only">{{ t("verb.close") }} panel</span>
    </button>
  </div>
</template>

<script setup>
import DocumentEditor from "./DocumentEditor.vue"
import DeleteDocument from "@/components/ui/ButtonDeleteDocument.vue"
import SplitterGroup from "@/components/ui/SplitterGroup.vue"
import AlertUnsavedChanges from "./ui/AlertUnsavedChanges.vue"
</script>

<template>
  <div class="Document">
    <SplitterGroup>
      <DocumentEditor />
    </SplitterGroup>
    <DeleteDocument />
    <AlertUnsavedChanges />
  </div>
</template>

<style scoped>
.Document {
  @apply w-full min-h-screen pl-12 md:pl-10 lg:pl-0 bg-background print:pl-0;
}
</style>

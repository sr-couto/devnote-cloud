<script setup>
import AlertLogout from "@/components/ui/AlertLogout.vue"
import AlertUnsavedChanges from "@/components/ui/AlertUnsavedChanges.vue"
import DeleteDocument from "@/components/ui/ButtonDeleteDocument.vue"
import DocumentEditor from "@/components/DocumentEditor.vue"
import SplitterGroup from "@/components/ui/SplitterGroup.vue"
</script>

<template>
  <div class="Document w-full min-h-screen pl-12 md:pl-10 lg:pl-0 bg-background print:pl-0">
    <SplitterGroup>
      <DocumentEditor />
    </SplitterGroup>
    <DeleteDocument />
    <AlertUnsavedChanges />
    <AlertLogout />
  </div>
</template>

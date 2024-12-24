<script setup lang="ts">
import Sidebar from "@/components/TheSidebar.vue"
import Document from "@/components/Document.vue"
import { onMounted, watch, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { useDatabaseStore } from "@/stores/database"
import { useSettingsStore } from "@/stores/settings"
import { useModalStore } from "@/stores/modal"

import PullToRefresh from "@/components/ui/PullToRefresh.vue"
import { useMagicKeysStore } from "@/stores/magic-keys"

useMagicKeysStore()

const settings = useSettingsStore()
const modal = useModalStore()
const db_store = useDatabaseStore()
const { project_name, project_body } = storeToRefs(db_store)

onMounted(() => {
  db_store.status = "READY"
})

watchEffect(() => {
  if (project_name.value || project_body.value) db_store.auto_save()
})
</script>

<template>
  <PullToRefresh>
    <div class="flex w-full print:!h-auto print:!overflow-y-auto h-svh overflow-y-hidden">
      <Sidebar />
      <Document />
    </div>
  </PullToRefresh>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useDatabaseStore } from "@/stores/database"
import { useMagicKeysStore } from "@/stores/magic-keys"
import { useStorage } from "@vueuse/core"
import { watchEffect } from "vue"
import Document from "@/components/Document.vue"
import PullToRefresh from "@/components/ui/PullToRefresh.vue"
import Sidebar from "@/components/TheSidebar.vue"
import Toasts from "@/components/ui/Toasts.vue"

useMagicKeysStore()
const db_store = useDatabaseStore()
const cursor_pointer = useStorage("cursor", true)
const { project_name, project_body } = storeToRefs(db_store)

watchEffect(() => {
  if (project_name.value || project_body.value) db_store.auto_save()
})
</script>

<template>
  <main
    class="w-full min-h-screen font-mono bg-background text-foreground"
    :class="cursor_pointer ? 'cursor_pointer' : 'cursor_initial'"
  >
    <PullToRefresh>
      <div class="flex w-full print:!h-auto print:!overflow-y-auto h-svh overflow-y-hidden">
        <Sidebar />
        <Document />
      </div>
    </PullToRefresh>
  </main>
  <Toasts />
</template>

<style>
.dxc-login-dlg div div {
  @apply !bg-background grid gap-3 !shadow-none !text-foreground !text-sm !font-mono !max-w-sm;
}

.dxc-login-dlg div div input {
  @apply !bg-secondary !text-foreground text-center !text-sm !font-mono;
}

.dxc-login-dlg div div div {
  @apply grid-cols-2;
}

.dxc-login-dlg div div h3 {
  @apply text-center;
}

.dxc-login-dlg div div p {
  @apply text-center;
}

.dxc-login-dlg div form label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @apply text-primary;
}

.dxc-login-dlg div form label input[type="otp"] {
  @apply -translate-y-5 !h-14;
}

.dxc-login-dlg div div div button {
  @apply bg-primary shrink-0 border-secondary border text-primary-foreground hover:bg-primary/80 text-xs inline-flex h-[35px] items-center justify-center  rounded-[4px] px-[15px] font-semibold  gap-3  focus:outline-2 focus:outline-foreground focus:outline-dashed focus:outline-offset-2;
}

.dxc-login-dlg div p {
  @apply !text-foreground;
}
</style>

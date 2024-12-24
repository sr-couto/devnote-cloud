<script setup lang="ts">
import Home from "@/views/Home.vue"
import Toasts from "@/components/ui/Toasts.vue"
import { useStorage } from "@vueuse/core"
const cursor_pointer = useStorage("cursor", true)
</script>

<template>
  <main
    class="w-full min-h-screen font-mono bg-background text-foreground"
    :class="cursor_pointer ? 'cursor_pointer' : 'cursor_initial'"
  >
    <Home />
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

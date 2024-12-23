<script setup>
import NumberFlow from "@number-flow/vue"
import SearchItem from "./SearchItem.vue"
import SearchItemChecked from "./SearchItemChecked.vue"
import ButtonCreateDocument from "@/components/ui/ButtonCreateDocument.vue"
import { useFocusStore } from "@/stores/focus"
import { useCounterStore } from "@/stores/counter"
import { allItemsTodo, allItemsChecked } from "@/composables/queries"
import { storeToRefs } from "pinia"
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "reka-ui"
import { ArrowDown, ArrowUp } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import { useIsMobile } from "@/composables/useIsMobile"
const focus = useFocusStore()
const { isMobile } = useIsMobile()
const counter = useCounterStore()
const { focusDocuments } = storeToRefs(focus)
const { t } = useI18n()
</script>

<template>
  <div class="h-full @container">
    <ButtonCreateDocument />
    <div
      class="flex pl-2 pr-1.5 py-1.5 mt-2 focus-within:border-primary bg-primary/10 border-t border-b border-secondary justify-between items-center"
    >
      <h2
        class="text-xs outline-none text-primary flex justify-start items-center gap-1"
        ref="focusDocuments"
        tabindex="-1"
      >
        {{ t("commandBar.documents") }}
        <NumberFlow
          class="bg-primary font-mono font-bold text-primary-foreground size-4 rounded flex justify-center items-center"
          :value="`${allItemsTodo ? allItemsTodo?.length : 0}`"
        />
      </h2>
      <div
        v-if="!isMobile"
        class="shrink-0 flex justify-end gap-2 opacity-60 text-xs text-foreground"
      >
        <kbd class="scale-90">ctrl</kbd>
        <button
          @click="counter.navigateDocument('prev')"
          class="flex justify-center  items-center bg-background"
        >
          <ArrowUp class="size-4 opacity-80" />
          <span class="sr-only">Navigate prev</span>
        </button>
        <button
          @click="counter.navigateDocument('next')"
          class="flex justify-center  items-center bg-background"
        >
          <ArrowDown class="size-4 opacity-80" />
          <span class="sr-only">Navigate next</span>
        </button>
      </div>
    </div>
    <!-- <div class="relative grid w-full gap-1 pl-1.5 pr-1 p-0.5 text-xs">
      <div
        class="relative flex items-center justify-between w-full col-span-2 border border-secondary"
        v-auto-animate="{ duration: 300 }"
      >
        <label
          class="w-full overflow-hidden relative ring-1 ring-secondary hover:ring-primary focus-within:ring-primary"
        >
          <input
            ref="focusSearch"
            v-model="searchTerm"
            :placeholder="`${t('sidebar.search')}`"
            class="text-xs outline-none pl-1 pr-12 h-8 bg-transparent placeholder:text-xs placeholder:text-foreground/40"
          />
        </label>
        <span
          v-if="!searchTerm"
          class="top-0 right-[0.015rem] flex items-center bg-primary/10 text-foreground justify-center h-8 text-xs min-w-12"
        >
          <NumberFlow :value="`${allItemsTodo ? allItemsTodo?.length : 0}`" />
        </span>
        <button
          v-else
          class="absolute top-0 right-[0.015rem] flex items-center justify-center gap-1 px-1 text-xs min-w-12 h-8 bg-primary/10 hover:outline-none hover:bg-primary/20 text-foreground focus-visible:ring-2 focus:outline focus:ring-primary/50 border-primary focus-visible:bg-primary/5 hover:text-foreground"
          @click="clearTerm()"
        >
          <span class="min-w-3">{{ results.length }}</span>
          <span class="sr-only">Results. Click to clear filter</span>
          <CircleX class="size-3" />
        </button>
        <div v-if="searchTerm" class="sr-only" role="alert">
          <span class="min-w-3">{{ results.length }}</span>
          <span class="sr-only">Results</span>
        </div>
      </div>
    </div> -->

    <div class="overflow-y-auto pl-1 SidebarProjects overflow-x-hidden h-[calc(100dvh-13rem)]">
      <ScrollAreaRoot class="w-full h-full rounded overflow-hidden" style="--scrollbar-size: 10px">
        <ScrollAreaViewport class="w-full h-full rounded">
          <div
            class="py-1 px-0.5 flex flex-col justify-start items-start relative gap-1 w-full min-h-24"
            v-if="allItemsTodo"
          >
            <SearchItem v-for="item in allItemsTodo" :key="item.id" :data="item" />
            <SearchItemChecked v-for="item in allItemsChecked" :key="item.id" :data="item" />
          </div>
          <div
            v-if="allItemsTodo?.length + allItemsChecked?.length === 0"
            class="w-full h-[calc(100vh-20rem)] text-center flex items-center justify-center"
          >
            <p class="w-40 text-xs text-muted-foreground text-pretty">
              {{ t("sidebar.noResultsDescription") }}
            </p>
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
          class="flex select-none touch-none p-0.5 bg-secondary transition-colors duration-[160ms] ease-out hover:bg-background data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollAreaThumb
            class="flex-1 bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
          />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
    </div>
  </div>
</template>

<template>
  <default class="table-contents">
    <div class="flex items-center">
      <div class="w-1/2 px-6">
        <slot />
      </div>
      <div class="w-1/2 flex items-center justify-center">
        <div
          class="flex flex-wrap items-center justify-center p-4 w-72 h-72 rounded-full bg-gradient-to-r from-fuchsia-700 to-purple-800 dark:(from-white to-purple-50)">
          <div class="flex flex-wrap items-center justify-center -mr-2">
            <figure v-for="(logo, i) in logoSources" :key="i" class="pr-2 pb-2">
              <img :src="logo" :alt="`logo ${i}`" width="125" height="75" class="w-auto h-12 object-contain" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import { defineProps, defineComponent, computed } from 'vue'
import { resolveAssetUrl } from '@slidev/client/layoutHelper'
import Default from './default.vue'

const components = defineComponent({ Default })
const props = defineProps({
  logos: {
    type: Array,
  }
})
const logoSources = computed(() => props.logos.map(logo => resolveAssetUrl(logo)))
</script>

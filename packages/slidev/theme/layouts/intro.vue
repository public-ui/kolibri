<template>
  <default class="intro">
    <div class="flex items-center">
      <figure class="w-1/2 px-12">
        <img :src="imageSrc" height="312" width="312"
          class="rounded-full p-2 bg-gradient-to-r from-fuchsia-700 to-purple-800 dark:(from-white to-purple-50)">
      </figure>
      <div class="w-1/2">
        <slot />
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import { defineProps, defineComponent, computed } from 'vue'
import { resolveAssetUrl } from '@slidev/client/layoutHelper'
import Default from '../layouts/default.vue'

const components = defineComponent({ Default })
const props = defineProps({
  introImage: {
    type: String,
  },
})
const imageSrc = computed(() => resolveAssetUrl(props.introImage))
</script>

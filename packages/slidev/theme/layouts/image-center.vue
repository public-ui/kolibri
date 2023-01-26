<template>
  <default class="image-center">
    <div class="flex flex-col">
      <slot />
      <img :src="imageSrc" alt="Slide image" :width="imageWidth" :height="imageHeight"
        class="rounded-md shadow-lg  m-auto object-contain" />
    </div>
  </default>
</template>

<script setup lang="ts">
import { defineProps, defineComponent, computed } from 'vue'
import { resolveAssetUrl } from '@slidev/client/layoutHelper'
import Default from '../layouts/default.vue'

const components = defineComponent({ Default })
const props = defineProps({
  image: {
    type: String,
  },
  imageWidth: {
    type: String,
  },
  imageHeight: {
    type: String,
  },
})
const imageSrc = computed(() => resolveAssetUrl(props.image))
</script>

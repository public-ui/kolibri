<template>
  <default class="new-section">
    <div class="flex items-center">
      <figure class="w-1/2">
        <img :src="imageSrc" alt="new section" width="400" height="400" class="ml-auto" />
      </figure>
      <div class="w-1/2 text-right pr-12">
        <slot />
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import { defineProps, defineComponent, computed } from 'vue'
import { resolveAssetUrl } from '@slidev/client/layoutHelper'
import Default from './default.vue'
import SectionIllustration from '../public/section-illustration.svg'

const components = defineComponent({ Default })
const props = defineProps({
  sectionImage: {
    type: String,
    default: SectionIllustration
  },
})
const imageSrc = computed(() => resolveAssetUrl(props.sectionImage))
</script>

<style>
.slidev-layout.new-section {
  @apply bg-gradient-to-r from-fuchsia-700 to-purple-800 text-white;
}

.slidev-layout.new-section *,
.slidev-layout.new-section h1,
.slidev-layout.new-section h2,
.slidev-layout.new-section h3,
.slidev-layout.new-section h4,
.slidev-layout.new-section h5,
.slidev-layout.new-section h6,
.slidev-layout.new-section p,
.slidev-layout.new-section strong,
.slidev-layout.new-section a {
  @apply text-white;
}
</style>

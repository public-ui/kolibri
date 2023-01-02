<template>
  <header v-if="logoHeader">
    <img :src="logoSrc" width="60" height="60" class="object-contain" />
  </header>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { resolveAssetUrl } from '@slidev/client/layoutHelper'

const props = defineProps({
  logoHeader: {
    type: String,
  },
})
const logoSrc = computed(() => resolveAssetUrl(props.logoHeader))
</script>

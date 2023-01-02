<template>
  <div class="bg-main slidev-layout">
    <layout-header :logoHeader="logoHeader" />
    <div class="my-auto">
      <slot />
    </div>
    <layout-footer
      :website="website"
      :handle="handle"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineComponent } from 'vue'
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

const components = defineComponent({
  LayoutHeader,
  LayoutFooter
})
const props = defineProps({
  logoHeader: {
    type: String,
  },
  website: {
    type: String,
  },
  handle: {
    type: String,
  },
})
</script>
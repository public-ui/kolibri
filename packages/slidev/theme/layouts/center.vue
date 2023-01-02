<template>
  <default class="center">
    <div class="flex flex-col items-center justify-center text-center">
      <slot />
    </div>
  </default>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import Default from '../layouts/default.vue'

const components = defineComponent({ Default })
</script>
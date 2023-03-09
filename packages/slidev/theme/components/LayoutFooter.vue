<template>
  <footer
    v-if="website || handle"
    class="mt-auto grid grid-cols-3 justify-between w-full text-gray-500 dark:text-white"
  >
    <small>{{ Intl.DateTimeFormat('de-DE', { month: "long", day: '2-digit', year: 'numeric' }).format(Date.now()) }}</small>
    <small class="text-center"
      ><strong>Ko</strong>mponenten-Bib<strong>li</strong>othek für die
      <strong>B</strong>ar<strong>ri</strong>erefreiheit</small
    >
    <small class="text-right">{{ handle }}</small>
  </footer>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  website: {
    type: String,
  },
  middle: {
    type: String,
  },
  handle: {
    type: String,
  },
});
</script>

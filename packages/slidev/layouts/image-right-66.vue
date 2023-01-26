<template>
  <default>
    <div class="grid grid-cols-[1fr_3fr] items-center">
      <div>
        <slot />
      </div>
      <div>
        <img v-bind:src="logoSources" class="mt-8 w-66% m-auto" v-bind:style="props.style" />
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import { defineProps, defineComponent, computed } from "vue";
import { resolveAssetUrl } from "@slidev/client/layoutHelper";
import Default from "../theme/layouts/default.vue";

defineComponent({ Default });
const props = defineProps({
  image: {
    type: String,
  },
  style: {
    type: String
  }
});
const logoSources = computed(() => props.image);
</script>

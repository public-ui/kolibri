<template>
  <default>
    <div class="grid gap-16 grid-cols-[1fr_2fr] ml-10">
      <div>
        <img
          class="w-75 m-auto rounded-full p-1 bg-gradient-to-r from-teal-700 to-cyan-800 dark:(from-white to-cyan-50)"
          src="https://avatars.githubusercontent.com/u/6279703"
        />
      </div>
      <div>
        <slot />
      </div></div
  ></default>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import Default from "../theme/layouts/default.vue";

const components = defineComponent({ Default });
</script>

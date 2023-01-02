<script setup lang="ts">
// variable
const msg = "Hello!";

const on = {
  onClick: console.log,
};

function log() {
  console.log("asd");
}
</script>
<template>
  <kol-button _label="modelValue" @click="log" v-bind:_on="on"></kol-button>
</template>

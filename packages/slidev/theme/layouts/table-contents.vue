<template>
  <default class="table-contents" :logoHeader="logoHeader">
    <div class="flex items-center">
      <div class="w-1/2 pl-6">
        <slot />
      </div>
      <div class="w-1/2 flex self-end justify-center">
        <svg class="w-64" viewBox="0 0 471 436" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="209.225" height="192.374" rx="12" fill="url(#paint0_linear)"/>
          <rect x="261.18" width="207.82" height="192.374" rx="12" fill="url(#paint1_linear)"/>
          <rect y="242.925" width="209.225" height="192.374" rx="12" fill="url(#paint2_linear)"/>
          <rect x="261" y="243" width="209.225" height="192.374" rx="12" fill="url(#paint3_linear)"/>
          <rect x="109.314" y="100.889" width="251.775" height="233.521" rx="8" stroke="url(#paint4_linear)" stroke-width="8"/>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="96.1872" x2="209.225" y2="96.1872" gradientUnits="userSpaceOnUse">
              <stop :stop-color="gradientColors[0]"/>
              <stop offset="1" :stop-color="gradientColors[1]"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="261.18" y1="96.1872" x2="469" y2="96.1872" gradientUnits="userSpaceOnUse">
              <stop :stop-color="gradientColors[0]"/>
              <stop offset="1" :stop-color="gradientColors[1]"/>
            </linearGradient>
            <linearGradient id="paint2_linear" x1="0" y1="339.112" x2="209.225" y2="339.112" gradientUnits="userSpaceOnUse">
              <stop :stop-color="gradientColors[0]"/>
              <stop offset="1" :stop-color="gradientColors[1]"/>
            </linearGradient>
            <linearGradient id="paint3_linear" x1="261" y1="339.187" x2="470.225" y2="339.187" gradientUnits="userSpaceOnUse">
              <stop :stop-color="gradientColors[0]"/>
              <stop offset="1" :stop-color="gradientColors[1]"/>
            </linearGradient>
            <linearGradient id="paint4_linear" x1="105.314" y1="217.65" x2="365.09" y2="217.65" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
              <stop offset="1" stop-color="#F5F3FF"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import { defineProps, defineComponent } from 'vue'
import Default from '../layouts/default.vue'

const components = defineComponent({ Default })
const props = defineProps({
  gradientColors: {
    type: Array,
    default: () => ['#A21CAF', '#5B21B6']
  }
})
</script>

<!-- https://codepen.io/vblazenka/pen/aNwLog -->

<template>
  <default>
    <div class="grid grid-cols-[2fr_1fr]">
      <div>
        <slot />
      </div>
      <div>
        <svg
          class="cursor-pointer"
          ref="egg"
          version="1.1"
          id="egg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="300px"
          height="400px"
          viewBox="0 0 300 400"
          enable-background="new 0 0 300 400"
          xml:space="preserve"
        >
          <g id="egg-all">
            <g id="bottom_part">
              <path
                id="bottom"
                fill="#E9E6DB"
                d="M89.467,194c-1.531,7.035-2.359,14.405-2.36,22h0.075c0.009,52,32.391,86.761,72.409,86.761 c40.018,0,72.409-39.13,72.409-87.12v-0.119c0-0.003,0-0.005,0-0.008c0-0.004,0-0.009,0-0.014c0-7.551-0.694-14.729-1.981-21.5 l-26.185,6l-44-6l-42.334,6L89.467,194z"
              />
              <path
                id="shbottom"
                fill="#DEDAC9"
                d="M99.182,215h-0.038c0.001-6.301,0.583-12.438,1.65-18.362l-11.539-2.469 c-1.375,6.676-2.11,13.651-2.111,20.831h0.038c-0.038,52.75,29.318,86.875,69.409,87.821c1.998,0.047,3.979-0.102,5.938-0.293 C125.355,299.196,99.19,264.344,99.182,215z"
              />
            </g>
            <g id="top_part">
              <path
                id="top"
                fill="#E9E6DB"
                d="M230.545,197c-6.561-41.887-35.882-68.88-71.082-68.88c-31.932,0-63.045,26.565-69.996,65.88 l28.7,6l40.667-6l45,6L230.545,197z"
              />
              <path
                id="shtop_1_"
                fill="#DEDAC9"
                d="M100.794,196.638c7.403-35.642,33.679-65.285,65.013-68.344
          c-1.996-0.18-4.011-0.294-6.051-0.294c-33.982,0-62.634,28.294-70.5,66.169L100.794,196.638z"
              />
              <circle
                id="highlight3"
                fill="#FFFFFD"
                cx="190.814"
                cy="151.488"
                r="4.146"
              />
              <circle
                id="highlight2"
                fill="#FFFFFD"
                cx="199.877"
                cy="159.502"
                r="4.146"
              />
              <circle
                id="highlight1"
                fill="#FFFFFD"
                cx="190.629"
                cy="160.687"
                r="2.612"
              />
            </g>
            <path
              ref="eggBreak"
              id="break"
              fill="none"
              stroke="#79736f"
              stroke-miterlimit="10"
              d=""
            />
          </g>
        </svg>
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  defineComponent,
  onUnmounted,
} from "vue";
import Default from "../theme/layouts/default.vue";

defineComponent({ Default });
const egg = ref<SVGElement | null>(null);
const eggBreak = ref<HTMLElement | null>(null);
const breakLine = [
  "M89.467,194",
  "117.5,200",
  "159.834,194",
  "203.834,200",
  "230.019,194",
];

let timeout;
const animateEgg = (index = 0) => {
  clearTimeout(timeout);
  if (eggBreak.value && index <= 5) {
    eggBreak.value.setAttribute("d", breakLine.slice(0, index).join(" "));
    timeout = setTimeout(() => {
      animateEgg(index + 1);
    }, 750);
  } else {
    timeout = setTimeout(() => {
      animateEgg();
    }, 2500);
  }
};


onMounted(() => {
  animateEgg();
});
onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

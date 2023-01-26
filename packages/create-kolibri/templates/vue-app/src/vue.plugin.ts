import { Plugin } from 'vue';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/core';
import { BMF } from '@public-ui/themes';

export const ComponentLibrary: Plugin = {
  install() {
    register(BMF, defineCustomElements)
      .then(() => console.log('Components registered'))
      .catch(console.warn);
  },
};

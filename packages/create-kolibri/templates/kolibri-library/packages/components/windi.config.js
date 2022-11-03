import { defineConfig } from 'windicss/helpers';

const COMMON_COLORS = {
  error: 'var(--kolibri-color-error)',
  info: 'var(--kolibri-color-info)',
  success: 'var(--kolibri-color-success)',
  warning: 'var(--kolibri-color-warning)',
  primary: 'var(--kolibri-color-primary)',
  secondary: 'var(--kolibri-color-secondary)',
  normal: 'var(--kolibri-color-normal)',
  danger: 'var(--kolibri-color-danger)',
  accent: 'var(--kolibri-color-accent)',
  ghost: 'var(--kolibri-color-ghost)',
  // light: 'var(--kolibri-color-light)',
  // dark: 'var(--kolibri-color-dark)',
};

export default defineConfig({
  // darkMode: 'media',
  extract: {
    include: ['src/**/*.{html,vue,jsx,tsx,svelte}'],
  },
  plugins: [require('windicss/plugin/filters')],
  theme: {
    extend: {
      colors: {
        ...COMMON_COLORS,
        DEFAULT: 'var(--kolibri-color)',
      },
      backgroundColor: {
        ...COMMON_COLORS,
        DEFAULT: 'var(--kolibri-background-color)',
        modal: 'var(--kolibri-background-color-modal)',
        'spin-1': 'var(--kolibri-color-spin-1)',
        'spin-2': 'var(--kolibri-color-spin-2)',
        'spin-3': 'var(--kolibri-color-spin-3)',
      },
      borderColor: {
        ...COMMON_COLORS,
        DEFAULT: 'var(--kolibri-border-color)',
      },
      borderRadius: {
        DEFAULT: 'var(--kolibri-border-radius)',
      },
      spacing: {
        1: 'calc(1 * var(--kolibri-spacing))',
        2: 'calc(2 * var(--kolibri-spacing))',
        3: 'calc(3 * var(--kolibri-spacing))',
        4: 'calc(4 * var(--kolibri-spacing))',
        5: 'calc(5 * var(--kolibri-spacing))',
        6: 'calc(6 * var(--kolibri-spacing))',
      },
    },
  },
});

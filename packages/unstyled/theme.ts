import { KoliBri } from '@public-ui/components';

/**
 * Registers a theme with no component CSS at all, so every KoliBri component renders using only its
 * own base Shadow DOM styling (the `kol-component` CSS layer) – no `kol-theme-component` layer is ever
 * adopted. Used by the visual-test harness to snapshot this "unstyled" baseline (see issue #10715),
 * which helps decide whether a rendering issue belongs in a component's base style or in theming.
 */
export const UNSTYLED = KoliBri.createTheme('unstyled', {});

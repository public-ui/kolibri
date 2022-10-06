import { h, JSX, Ref, RefCallback } from 'preact';
import { forwardRef as preactForwardRef } from 'preact/compat';

import type { StylePreactProps } from '../interfaces';

export type StencilPreactExternalProps<PropType, ElementType extends EventTarget> = PropType &
  Omit<JSX.HTMLAttributes<ElementType>, 'style'> &
  StylePreactProps;

// This will be replaced with Preact.ForwardedRef when react-output-target is upgraded to Preact v17
export type StencilPreactForwardedRef<T> = ((instance: T | null) => void) | null;

export const setRef = (ref: StencilPreactForwardedRef<any> | Ref<any> | undefined, value: any) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    ref.current = value;
  }
};

export const mergeRefs = (...refs: (StencilPreactForwardedRef<any> | Ref<any> | undefined)[]): RefCallback<any> => {
  return (value: any) => {
    refs.forEach((ref) => {
      setRef(ref, value);
    });
  };
};

export const createForwardRef = <PropType, ElementType extends EventTarget>(
  PreactComponent: any,
  displayName: string
) => {
  const forwardRef = (
    props: StencilPreactExternalProps<PropType, ElementType>,
    ref: StencilPreactForwardedRef<ElementType>
  ) => {
    return <PreactComponent {...props} forwardedRef={ref} />;
  };
  forwardRef.displayName = displayName;

  return preactForwardRef(forwardRef);
};

export const defineCustomElement = (tagName: string, customElement: any) => {
  if (customElement !== undefined && typeof customElements !== 'undefined' && !customElements.get(tagName)) {
    customElements.define(tagName, customElement);
  }
};

export * from './attachProps';
export * from './case';

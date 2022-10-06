import { h, Component, RefObject, Ref, Context, JSX } from 'preact';

import {
  attachProps,
  createForwardRef,
  dashToPascalCase,
  defineCustomElement,
  isCoveredByReact,
  mergeRefs,
} from './utils';

export interface HTMLStencilElement extends HTMLElement {
  componentOnReady(): Promise<this>;
}

interface StencilPreactInternalProps<ElementType extends EventTarget> extends JSX.HTMLAttributes<ElementType> {
  forwardedRef: RefObject<ElementType>;
  ref?: Ref<any>;
}

export const createPreactComponent = <
  PropType,
  ElementType extends HTMLStencilElement,
  ContextStateType = {},
  ExpandedPropsTypes = {}
>(
  tagName: string,
  PreactComponentContext?: Context<ContextStateType>,
  manipulatePropsFunction?: (
    originalProps: StencilPreactInternalProps<ElementType>,
    propsToPass: any
  ) => ExpandedPropsTypes,
  customElement?: any
) => {
  defineCustomElement(tagName, customElement);

  const displayName = dashToPascalCase(tagName);
  const PreactComponent = class extends Component<StencilPreactInternalProps<ElementType>> {
    componentEl!: ElementType;

    setComponentElRef = (element: ElementType) => {
      this.componentEl = element;
    };

    constructor(props: StencilPreactInternalProps<ElementType>) {
      super(props);
    }

    componentDidMount() {
      this.componentDidUpdate(this.props);
    }

    componentDidUpdate(prevProps: StencilPreactInternalProps<ElementType>) {
      attachProps(this.componentEl, this.props, prevProps);
    }

    render() {
      const { children, forwardedRef, style, className, ref, ...cProps } = this.props;

      let propsToPass = Object.keys(cProps).reduce((acc, name) => {
        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          const eventName = name.substring(2).toLowerCase();
          if (typeof document !== 'undefined' && isCoveredByReact(eventName)) {
            (acc as any)[name] = (cProps as any)[name];
          }
        } else {
          (acc as any)[name] = (cProps as any)[name];
        }
        return acc;
      }, {});

      if (manipulatePropsFunction) {
        propsToPass = manipulatePropsFunction(this.props, propsToPass);
      }

      const newProps: Omit<StencilPreactInternalProps<ElementType>, 'forwardedRef'> = {
        ...propsToPass,
        ref: mergeRefs(forwardedRef, this.setComponentElRef),
        style,
      };

      return h(tagName, newProps, children);
    }

    static get displayName() {
      return displayName;
    }
  };

  // If context was passed to createPreactComponent then conditionally add it to the Component Class
  if (PreactComponentContext) {
    Component.contextType = PreactComponentContext;
  }

  return createForwardRef<PropType, ElementType>(PreactComponent, displayName);
};

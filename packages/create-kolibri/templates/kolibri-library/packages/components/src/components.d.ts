/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyExample {
        /**
          * Gibt den Text des Span an.
         */
        "_label": string;
    }
}
declare global {
    interface HTMLMyExampleElement extends Components.MyExample, HTMLStencilElement {
    }
    var HTMLMyExampleElement: {
        prototype: HTMLMyExampleElement;
        new (): HTMLMyExampleElement;
    };
    interface HTMLElementTagNameMap {
        "my-example": HTMLMyExampleElement;
    }
}
declare namespace LocalJSX {
    interface MyExample {
        /**
          * Gibt den Text des Span an.
         */
        "_label": string;
    }
    interface IntrinsicElements {
        "my-example": MyExample;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-example": LocalJSX.MyExample & JSXBase.HTMLAttributes<HTMLMyExampleElement>;
        }
    }
}

declare module 'react-hook-form' {
        export const Controller: any;
        export function useFormContext<T = any>(): { control: any };
        export interface UseControllerProps<T> {
                name: string;
                rules?: any;
                defaultValue?: any;
                control?: any;
        }
        export interface FieldValues extends Record<string, any> {}
}

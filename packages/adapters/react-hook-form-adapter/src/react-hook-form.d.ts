declare module 'src/react-hook-form' {
	export const Controller: any;
	export interface UseControllerProps<T> {
		name: string;
		rules?: any;
		defaultValue?: any;
		control: any;
	}
	export interface FieldValues extends Record<string, any> {}
}

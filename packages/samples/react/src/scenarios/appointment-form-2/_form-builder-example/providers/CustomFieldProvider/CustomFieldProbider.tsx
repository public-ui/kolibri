import * as React from 'react';
import { CustomFieldService, type CustomFieldType, type CustomFieldRegistration } from './CustomFieldService';

const CustomFieldContext = React.createContext(new CustomFieldService());

type CustomFieldProviderProps = React.PropsWithChildren<{
	customFieldRegistrations: CustomFieldRegistration;
}>;

function useCustomFieldService(): CustomFieldService {
	const context = React.useContext(CustomFieldContext);
	return context;
}

export function useCustomField(key: string): CustomFieldType | undefined {
	const ctx = useCustomFieldService();
	return ctx.getCustomFieldDefinition(key);
}

function CustomFieldProvider({ children, customFieldRegistrations }: CustomFieldProviderProps) {
	const [service, setService] = React.useState(() => new CustomFieldService(customFieldRegistrations));

	React.useLayoutEffect(() => {
		setService(new CustomFieldService(customFieldRegistrations));
	}, [customFieldRegistrations]);

	return <CustomFieldContext.Provider value={service}>{children}</CustomFieldContext.Provider>;
}

export default CustomFieldProvider;

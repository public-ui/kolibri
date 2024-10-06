import * as React from 'react';
import { SchemaValidationService, type SchemaRegistration } from './SchemaValidationService';

const SchemaValidationContext = React.createContext(new SchemaValidationService());

export type SchemaValidationProviderProps = React.PropsWithChildren<{
	schemaRegistrations: SchemaRegistration;
}>;

export function useSchemaValidationService(): SchemaValidationService {
	const context = React.useContext(SchemaValidationContext);
	return context;
}

function SchemaValidationProvider({ children, schemaRegistrations }: SchemaValidationProviderProps) {
	const [service, setService] = React.useState(() => new SchemaValidationService(schemaRegistrations));

	React.useLayoutEffect(() => {
		setService(new SchemaValidationService(schemaRegistrations));
	}, [schemaRegistrations]);

	return <SchemaValidationContext.Provider value={service}>{children}</SchemaValidationContext.Provider>;
}

export default SchemaValidationProvider;

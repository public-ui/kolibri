import * as React from 'react';
import { DataQueryService, type QueryRegistration } from './DataQueryService';

const DataQueryContext = React.createContext(new DataQueryService());

export type DataQueryProviderProps = React.PropsWithChildren<{
	queryRegistrations: QueryRegistration;
}>;

export function useQuery<T extends object>(key: string, queryData: unknown): { isPending: boolean; data: T[] } {
	const [isPending, setPending] = React.useState(false);
	const [data, setData] = React.useState<T[]>([]);
	const context = React.useContext(DataQueryContext);

	React.useEffect(() => {
		const queryDef = context.getQueryDefinition(key);
		if (!queryDef?.queryFn) {
			return () => {};
		}

		setPending(true);

		setTimeout(async () => {
			setData((await queryDef.queryFn(queryData)) as T[]);
			setPending(false);
		}, 1);

		return () => {
			setPending(false);
		};
	}, [key, queryData]);

	return { isPending, data };
}

function DataQueryProvider({ children, queryRegistrations }: DataQueryProviderProps) {
	const [service, setService] = React.useState(() => new DataQueryService(queryRegistrations));

	React.useLayoutEffect(() => {
		setService(new DataQueryService(queryRegistrations));
	}, [queryRegistrations]);

	return <DataQueryContext.Provider value={service}>{children}</DataQueryContext.Provider>;
}

export default DataQueryProvider;

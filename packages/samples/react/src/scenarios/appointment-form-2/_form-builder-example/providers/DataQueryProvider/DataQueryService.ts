export type QueryDefinition = { queryFn: (data: unknown) => Promise<unknown> };
export type QueryRegistration = Record<string, QueryDefinition>;

export class DataQueryService {
	private _queryRegistrations: QueryRegistration | undefined;

	public constructor(queryRegistrations?: QueryRegistration) {
		this._queryRegistrations = queryRegistrations;
	}

	public getQueryDefinition(key: string) {
		return this._queryRegistrations?.[key];
	}
}

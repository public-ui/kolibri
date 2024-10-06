import * as Yup from 'yup';

export type SchemaRegistration = Record<string, Yup.AnyObject>;

export class SchemaValidationService {
	private _schemaRegistrations: SchemaRegistration | undefined;

	public constructor(schemaRegistrations?: SchemaRegistration) {
		this._schemaRegistrations = schemaRegistrations;
	}

	public getSchema(name: string) {
		return this._schemaRegistrations?.[name];
	}
}

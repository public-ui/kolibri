export type CustomFieldType = {
	Component: React.ComponentType;
	ComponentProps?: Record<string, unknown>;
};

export type CustomFieldRegistration = Record<string, CustomFieldType>;

export class CustomFieldService {
	private _customFieldRegistrations: CustomFieldRegistration | undefined;

	public constructor(customFieldRegistrations?: CustomFieldRegistration) {
		this._customFieldRegistrations = customFieldRegistrations;
	}

	public getCustomFieldDefinition(key: string) {
		return this._customFieldRegistrations?.[key];
	}
}

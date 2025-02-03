import type { AccessKeyPropType, ShortKeyPropType } from '../props';

export const validateAccessAndShortKey = (accessKey?: AccessKeyPropType, shortKey?: ShortKeyPropType) => {
	if (accessKey && shortKey) {
		throw new Error('AccessKey and ShortKey are used. Only one is allowed.');
	}
};

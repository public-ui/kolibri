import type { ImagePropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Src prop for image content used eg in card
 */
export type ImageProp = SimpleProp<'image', ImagePropType>;

function normalizeImage(value: unknown): ImagePropType | never {
	// if (typeof value === 'object' && value !== null) {
	// 	const v = value as Record<string, unknown>;
	// 	const keys = Object.keys(v);

	// 	if (keys.every((k) => k === 'uri' || k === 'alt')) {
	// 		if (
	// 			Object.prototype.hasOwnProperty.call(v, 'uri') &&
	// 			typeof v.uri === 'string' &&
	// 			Object.prototype.hasOwnProperty.call(v, 'alt') &&
	// 			typeof v.alt === 'string'
	// 		) {
	// 			return v as ImagePropType;
	// 		}
	// 	}
	// }
	if (typeof value === 'object' && value !== null) {
		return value as ImagePropType;
	}
	throw new Error(`Invalid image object: ${typeof value}`);
}

export const imageProp = createPropDefinition<ImageProp>('image', undefined as unknown as ImagePropType, normalizeImage);

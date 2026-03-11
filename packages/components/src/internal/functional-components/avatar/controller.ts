import type { ColorPair } from '../../../schema';
import { colorProp, labelProp, srcProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { AvatarApi } from './api';
import { avatarPropsConfig } from './api';

/**
 * Formats a single name as an initial by taking the first character and converting it to uppercase.
 * @param name The name to format as an initial
 * @returns The uppercase first character, or empty string if name is empty
 */
const formatNameAsInitial = (name: string): string => {
	if (name.length === 0) {
		return '';
	}

	return name[0].toUpperCase();
};

/**
 * Normalizes the initials from a full name or label.
 * If the name contains multiple words, returns the first letters of the first and last words.
 * Otherwise, returns the first letter of the entire input.
 * @param value The input value to normalize as initials
 * @returns The normalized initials string
 */
const normalizeInitials = (value: string): string => {
	const names = value.trim().split(/\s+/); // split by any whitespace characters
	const first = names[0];
	const last = names[names.length - 1];

	// names might consist of only one word
	if (names.length >= 2 && first && last) {
		return `${formatNameAsInitial(first)}${formatNameAsInitial(last)}`;
	}

	return formatNameAsInitial(value);
};

export class AvatarController extends BaseController<AvatarApi> implements ControllerInterface<AvatarApi> {
	public constructor(setState: SetStateFn<AvatarApi>, getState: GetStateFn<AvatarApi>) {
		super(avatarPropsConfig, setState, getState);
	}

	public componentWillLoad(props: ResolvedInputProps<AvatarApi>): void {
		const { color, label, src } = props;
		this.watchColor(color);
		this.watchLabel(label);
		this.watchSrc(src);
	}

	public watchColor(value?: string | ColorPair): void {
		colorProp.apply(value, (v) => {
			this.setRenderProp('color', v);
		});
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.setState('initials', normalizeInitials(v));
		});
	}

	public watchSrc(value?: string): void {
		srcProp.apply(value, (v) => {
			this.setRenderProp('src', v);
		});
	}
}

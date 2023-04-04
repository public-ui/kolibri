export type AnyIconFontClass = string;

export type KoliBriCustomIcon = {
	icon: AnyIconFontClass;
	style?: Record<string, string>;
};

type IconOrIconClass = AnyIconFontClass | KoliBriCustomIcon;

export type KoliBriHorizontalIcon = {
	right?: IconOrIconClass;
	left?: IconOrIconClass;
};

type KoliBriVerticalIcon = {
	top?: IconOrIconClass;
	bottom?: IconOrIconClass;
};

export type KoliBriAllIcon = KoliBriHorizontalIcon & KoliBriVerticalIcon;

export type KoliBriIconProp = AnyIconFontClass | KoliBriAllIcon;

export type KoliBriIconState = KoliBriAllIcon;

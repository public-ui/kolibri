export type AnyIconFontClass = string;

export type KoliBriCustomIcon = {
	icon: AnyIconFontClass;
	label?: string;
	style?: Record<string, string>;
};

type IconOrIconClass = AnyIconFontClass | KoliBriCustomIcon;

export type KoliBriHorizontalIcons = {
	right?: IconOrIconClass;
	left?: IconOrIconClass;
};

type KoliBriVerticalIcons = {
	top?: IconOrIconClass;
	bottom?: IconOrIconClass;
};

export type KoliBriAllIcons = KoliBriHorizontalIcons & KoliBriVerticalIcons;

export type KoliBriIconsProp = AnyIconFontClass | KoliBriAllIcons;

export type KoliBriIconsState = KoliBriAllIcons;

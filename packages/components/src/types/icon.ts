export type KoliBriIconProp = AnyIconFontClass | KoliBriAllIcon;

// ts-prune-ignore-next
export type AnyIconFontClass = string;

export type KoliBriCustomIcon = {
	icon: AnyIconFontClass;
	style?: Record<string, string>;
};

export type KoliBriHorizontalIcon =
	| {
			right: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			right?: AnyIconFontClass | KoliBriCustomIcon;
			left: AnyIconFontClass | KoliBriCustomIcon;
	  };

// export type KoliBriVerticalIcon =
// 	| {
// 			top: AnyIconFontClass | KoliBriCustomIcon;
// 			bottom?: AnyIconFontClass | KoliBriCustomIcon;
// 	  }
// 	| {
// 			top?: AnyIconFontClass | KoliBriCustomIcon;
// 			bottom: AnyIconFontClass | KoliBriCustomIcon;
// 	  };

type KoliBriAllIcon =
	| {
			top: AnyIconFontClass | KoliBriCustomIcon;
			right?: AnyIconFontClass | KoliBriCustomIcon;
			bottom?: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			top?: AnyIconFontClass | KoliBriCustomIcon;
			right: AnyIconFontClass | KoliBriCustomIcon;
			bottom?: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			top?: AnyIconFontClass | KoliBriCustomIcon;
			right?: AnyIconFontClass | KoliBriCustomIcon;
			bottom: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			top?: AnyIconFontClass | KoliBriCustomIcon;
			right?: AnyIconFontClass | KoliBriCustomIcon;
			bottom?: AnyIconFontClass | KoliBriCustomIcon;
			left: AnyIconFontClass | KoliBriCustomIcon;
	  };

export type KoliBriIconState = {
	top?: AnyIconFontClass | KoliBriCustomIcon;
	right?: AnyIconFontClass | KoliBriCustomIcon;
	bottom?: AnyIconFontClass | KoliBriCustomIcon;
	left?: AnyIconFontClass | KoliBriCustomIcon;
};

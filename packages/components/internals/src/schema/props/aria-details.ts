/* types */
/**
 * An IDREF list (space-separated) identifying external element(s) that provide accessible details for this component.
 * Resolves the IDREFs to element references and pushes them to the native control's ariaDetailsElements
 * to cross the Shadow DOM boundary.
 * Screen reader support is heavily fragmented (see KNOWN_ISSUES.md): only Orca announces presence,
 * content and end of the details region completely; VoiceOver, TalkBack and Narrator ignore the
 * relation entirely.
 */
export type AriaDetailsPropType = string;

export type PropAriaDetails = {
	ariaDetails: AriaDetailsPropType;
};

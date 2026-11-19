/**
 * Advance widths of Verdana per 1000 units of the font size, for the characters the design export
 * measures (ASCII and German text). Measured once with the canvas text metrics of a browser.
 */
const CHARACTERS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄÖÜäöüß–—„“”…€';
const REGULAR = [
	352, 394, 459, 818, 636, 1076, 727, 269, 454, 454, 636, 818, 364, 454, 364, 454, 636, 636, 636, 636, 636, 636, 636, 636, 636, 636, 454, 454, 818, 818, 818,
	545, 1000, 684, 686, 698, 771, 632, 575, 775, 751, 421, 455, 693, 557, 843, 748, 787, 603, 787, 695, 684, 616, 732, 684, 989, 685, 615, 685, 454, 454, 454,
	818, 636, 636, 601, 623, 521, 623, 596, 352, 623, 633, 274, 344, 592, 274, 973, 633, 607, 623, 623, 427, 521, 394, 633, 592, 818, 592, 592, 525, 635, 454,
	635, 818, 684, 787, 732, 601, 607, 633, 620, 636, 1000, 459, 459, 459, 818, 636,
];
const BOLD = [
	342, 402, 587, 867, 711, 1272, 862, 332, 543, 543, 711, 867, 361, 480, 361, 689, 711, 711, 711, 711, 711, 711, 711, 711, 711, 711, 402, 402, 867, 867, 867,
	617, 964, 776, 762, 724, 830, 683, 650, 811, 837, 546, 555, 771, 637, 948, 847, 850, 733, 850, 782, 710, 682, 812, 764, 1128, 764, 737, 692, 543, 689, 543,
	867, 711, 711, 668, 699, 588, 699, 664, 422, 699, 712, 342, 403, 671, 342, 1058, 712, 687, 699, 699, 497, 593, 456, 712, 650, 979, 669, 651, 597, 711, 543,
	711, 867, 776, 850, 812, 668, 687, 712, 713, 711, 1000, 587, 587, 587, 1049, 711,
];

const regular = new Map([...CHARACTERS].map((character, index) => [character, REGULAR[index]]));
const bold = new Map([...CHARACTERS].map((character, index) => [character, BOLD[index]]));

/** Width of a single-line text in Verdana; an unknown character counts as an `n`. */
export function verdanaWidth(text: string, fontSize: number, weight: number): number {
	const widths = weight >= 600 ? bold : regular;
	const fallback = widths.get('n') ?? 600;
	let total = 0;
	for (const character of text) total += widths.get(character) ?? fallback;
	return (total * fontSize) / 1000;
}

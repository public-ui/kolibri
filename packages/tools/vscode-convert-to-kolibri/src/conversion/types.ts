export type Confidence = 'high' | 'medium' | 'low';

export interface ConversionCandidate {
	kind: 'button' | 'input' | 'link' | 'select' | 'unknown';
	confidence: Confidence;
	original: string;
	replacement: string;
	reason?: string;
	warnings?: string[];
}

export interface ConversionOutput {
	text: string;
	candidates: ConversionCandidate[];
}

export interface ScanSummary {
	counts: Record<string, number>;
	candidates: ConversionCandidate[];
}

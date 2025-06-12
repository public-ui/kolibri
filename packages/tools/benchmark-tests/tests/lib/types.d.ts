import { TAGS } from './config';

export type TagType = (typeof TAGS)[number];

export type Measure = {
	hydrated: number | null;
	themed: number | null;
};

export type Params = {
	batchSize: number;
	iterations: number;
	tag: TagType;
	timeout: number;
};

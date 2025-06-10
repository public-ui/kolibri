import { TAGS } from './config';

export type TagType = (typeof TAGS)[number];

export type Measure = {
	hydrated: number | null;
	themed: number | null;
};

export type Params = {
	iterations: number;
	tag: TagType;
	timeout: number;
};

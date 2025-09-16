type TagNameTransformer = (tagName: string) => string;

export let tagNameTransformer: TagNameTransformer | undefined;
export const setTagNameTransformer = (_tagNameTransformer: TagNameTransformer) => {
  tagNameTransformer = _tagNameTransformer;
};

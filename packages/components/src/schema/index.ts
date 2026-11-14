/**
 * Type-level re-export of the schema barrel that lives in the internals package. Keeps the
 * published type path `@public-ui/components/dist/types/schema/index` stable for consumers
 * (e.g. the react-hook-form adapter) that import component API types directly.
 */
export * from '@public-ui/internals/schema/index';

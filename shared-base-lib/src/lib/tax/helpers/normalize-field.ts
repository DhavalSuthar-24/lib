export const normalizeField = (field: string | undefined, normalizeFunc: (value: string) => string): string | undefined => (field ? normalizeFunc(field) : field);

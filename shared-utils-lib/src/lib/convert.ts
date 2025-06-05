export const parseBool = (value?: string): boolean => {
  value = value?.trim().toLowerCase() ?? 'false';
  return value === 'true' || value === 'yes';
};

export const sleep = (time = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

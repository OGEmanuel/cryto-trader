export const isMoreThanOneWord = (str: string) => {
  return str.trim().split(/\s+/).length > 1;
};
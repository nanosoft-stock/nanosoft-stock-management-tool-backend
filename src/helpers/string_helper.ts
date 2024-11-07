export const toLowerSnakeCase = (str: string): string =>
  str.toLowerCase().replace(/ /g, "_");

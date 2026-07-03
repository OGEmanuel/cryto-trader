export const getIsPositive = (change24h: number) => {
  const isPositive = !change24h?.toString().startsWith('-');

  return isPositive;
};

export const getSvgUri = (iconUrl: string) => {
  const svgUri = `${process.env.EXPO_PUBLIC_API_URL}${iconUrl.slice(1)}`;

  return svgUri;
};

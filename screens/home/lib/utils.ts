export const getIsPositive = (change24h: number) => {
  const isPositive = !change24h?.toString().startsWith('-');

  return isPositive;
};

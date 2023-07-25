export const probabilityToPercentage = (probability: number): number => {
  const percentageProbability = probability * 100;
  return Number(percentageProbability.toFixed(2));
};

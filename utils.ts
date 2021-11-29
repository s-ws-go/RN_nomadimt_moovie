export const MakingIgmPath = (imgUri: string, size: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${imgUri}`;
};

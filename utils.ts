export const makeImgPath = (imgurl: string, size: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${imgurl}`;
};

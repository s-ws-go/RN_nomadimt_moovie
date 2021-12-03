const API_KEY = '10923b261ba94d897ac6b81148314a3f';
const BASIC_URL = 'https://api.themoviedb.org/3';

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const MoviesAPI = {
  trending: () => fetch(`${BASIC_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) => res.json()),
  upcoming: () => fetch(`${BASIC_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) => res.json()),
  nowPlaying: () => fetch(`${BASIC_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) => res.json()),
  search: (query) => {
    const FINDTEXT = query.queryKey[1];
    return fetch(`${BASIC_URL}/search/movie/?api_key=${API_KEY}&query=${FINDTEXT}`).then((res) => res.json());
  },
};

export const TvAPI = {
  trending: () => fetch(`${BASIC_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) => res.json()),
  popular: () => fetch(`${BASIC_URL}/tv/popular?api_key=${API_KEY}`).then((res) => res.json()),
  airingToday: () => fetch(`${BASIC_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) => res.json()),
  // search: (query) => {
  //   const FINDTEXT = query.queryKey[1];
  //   fetch(`${BASIC_URL}/search/tv/?api_key=${API_KEY}&query=${FINDTEXT}`).then((res) => res.json());
  // },
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(`${BASIC_URL}/search/tv/?api_key=${API_KEY}&query=${query}`).then((res) => res.json());
  },
};

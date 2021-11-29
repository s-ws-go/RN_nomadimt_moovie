const API_KEY = '10923b261ba94d897ac6b81148314a3f';
const BASIC_URL = 'https://api.themoviedb.org/3';

const trending = () => fetch(`${BASIC_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) => res.json());

const upcoming = () => fetch(`${BASIC_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then((res) => res.json());

const nowPlaying = () => fetch(`${BASIC_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then((res) => res.json());

export const MoviesAPI = { trending, upcoming, nowPlaying };

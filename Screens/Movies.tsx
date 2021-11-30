import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, Image, StyleSheet } from 'react-native';
import { MakingIgmPath } from '../utils';
import { BlurView } from 'expo-blur';
import Slide from '../components/Slide';

const API_KEY = '10923b261ba94d897ac6b81148314a3f';

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;
const Title = styled.Text`
  color: white;
  margin-left: 15px;
  margin-top: 15px;
  font-weight: 700;
`;
const ContentsContainer = styled.View`
  flex-direction: row;
`;

const Wrapper = styled.View`
  width: 50%;
`;
const Poster = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 30;
`;
const Contents = styled.Text`
  color: white;
  width: 50%;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [loading, setLoading] = useState(true);
  const [playingMovie, setPlayingMovie] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const { results } = await response.json();
    setPlayingMovie(results);
    setLoading(false);
  };
  const getUpComing = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
    const { results } = await response.json();
    setUpcoming(results);
    setLoading(false);
  };
  const getTrending = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
    const { results } = await response.json();
    setTrending(results);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpComing(), getTrending()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={1}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {playingMovie.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
import Votes from '../components/Votes';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

const API_KEY = '10923b261ba94d897ac6b81148314a3f';

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TrendingContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Title = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin: 15px 0px 15px 15px;
`;

const UpContainer = styled.View`
  margin-top: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playingMovie, setPlayingMovie] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const { results } = await response.json();
    setPlayingMovie(results);
  };
  const getUpComing = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
    const { results } = await response.json();
    setUpcoming(results);
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
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
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
      <TrendingContainer>
        <Title>Trending Movies</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trending.map((movie) => (
            <VMedia key={movie.id} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} />
          ))}
        </ScrollView>
      </TrendingContainer>
      <UpContainer>
        <Title>Upcoming Movies</Title>
        <ScrollView>
          {upcoming.map((movie) => (
            <HMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
            />
          ))}
        </ScrollView>
      </UpContainer>
    </Container>
  );
};

export default Movies;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
import Votes from '../components/Votes';

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

const TrendingContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const Movie = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 15px;
`;
const Title = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin: 15px 0px 15px 15px;
`;
const TrendingTitle = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-top: 5px;
  font-size: 13px;
`;

const UpContainer = styled.View`
  margin-top: 10px;
`;

const UpcomingList = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  margin-left: 15px;
`;
const UpColumn = styled.View`
  width: 60%;
  margin-left: 15px;
`;
const Uptitle = styled.Text`
  margin-bottom: 15px;
  color: white;
  font-weight: 600;
`;
const Uprelease = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 15px;
`;
const UpcomingOverview = styled(Uprelease)``;

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
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <TrendingTitle>
                {movie.original_title.slice(0, 10)}
                {movie.original_title.length > 10 ? '...' : null}
              </TrendingTitle>
              <Votes votes={movie.vote_average}></Votes>
            </Movie>
          ))}
        </ScrollView>
      </TrendingContainer>
      <UpContainer>
        <Title>Upcoming Movies</Title>
        <ScrollView>
          {upcoming.map((movie) => (
            <UpcomingList key={movie.id}>
              <Poster path={movie.poster_path} />
              <UpColumn>
                <Uptitle>{movie.original_title}</Uptitle>
                <Uprelease>{new Date(movie.release_date).toLocaleDateString('ko', { month: 'long', year: 'numeric', day: 'numeric' })}</Uprelease>
                <UpcomingOverview>{`${movie.overview.slice(0, 150)}...`}</UpcomingOverview>
              </UpColumn>
            </UpcomingList>
          ))}
        </ScrollView>
      </UpContainer>
    </Container>
  );
};

export default Movies;

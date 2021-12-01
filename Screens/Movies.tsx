import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

const API_KEY = '10923b261ba94d897ac6b81148314a3f';

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TrendingContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 15px;
`;

const TrendingTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin: 15px 0 15px 0;
`;
const UpcomingTitle = styled(TrendingTitle)`
  margin-left: 15px;
`;

const Seperator = styled.View`
  width: 15px;
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
    <FlatList
      ListHeaderComponent={
        <>
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
            <TrendingTitle>Trending Movies</TrendingTitle>
            <FlatList
              data={trending}
              keyExtractor={(item) => item.id + ''}
              renderItem={({ item }) => (
                <VMedia key={item.id} posterPath={item.poster_path} originalTitle={item.original_title} voteAverage={item.vote_average} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <Seperator />}
            ></FlatList>
          </TrendingContainer>
          <UpcomingTitle>Upcoming Movies</UpcomingTitle>
        </>
      }
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      data={upcoming}
      keyExtractor={(item) => item.id + ''}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          voteAverage={item.vote_average}
        />
      )}
    ></FlatList>
  );
};

export default Movies;

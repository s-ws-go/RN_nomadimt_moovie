import React, { useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, FlatList, RefreshControl } from 'react-native';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import { useQuery, useQueryClient } from 'react-query';
import { MovieResponse, MoviesAPI } from '../api';
import { Loader } from '../components/Loader';
import { HLIst } from '../components/HLIst';

const TrendingContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Title = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const Seperator = styled.View`
  width: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: playingLoading, data: playingData } = useQuery<MovieResponse>(['Movies', 'Playing'], MoviesAPI.nowPlaying);
  const { isLoading: trendingLoading, data: trendingData } = useQuery<MovieResponse>(['Movies', 'Trending'], MoviesAPI.trending);
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery<MovieResponse>(['Movies', 'Upcoming'], MoviesAPI.upcoming);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['Movies']);
    setRefreshing(false);
  };
  const loading = playingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <Loader />
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
            {playingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ''}
                posterPath={movie.poster_path || ''}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fulldata={movie}
              />
            ))}
          </Swiper>
          <TrendingContainer>{trendingData ? <HLIst data={trendingData.results} title="Trending Movies" /> : null}</TrendingContainer>
          <Title>Upcoming Movies</Title>
        </>
      }
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
      data={upcomingData?.results}
      keyExtractor={(item) => item.id + ''}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ''}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          voteAverage={item.vote_average}
          fulldata={item}
        />
      )}
    ></FlatList>
  );
};

export default Movies;

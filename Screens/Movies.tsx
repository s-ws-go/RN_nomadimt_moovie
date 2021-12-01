import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { useQuery, useQueryClient } from 'react-query';
import { MoviesAPI } from '../api';

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
  const queryClient = useQueryClient();
  const { isLoading: playingLoading, data: playingData, isRefetching: playingRefetching } = useQuery(['Movies', 'Playing'], MoviesAPI.nowPlaying);
  const { isLoading: trendingLoading, data: trendingData, isRefetching: trendingRefetching } = useQuery(['Movies', 'Trending'], MoviesAPI.trending);
  const { isLoading: upcomingLoading, data: upcomingData, isRefetching: upcomingRefetching } = useQuery(['Movies', 'Upcoming'], MoviesAPI.upcoming);

  const loading = playingLoading || upcomingLoading || trendingLoading;
  const refreshing = playingRefetching || trendingRefetching || upcomingRefetching;
  const onRefresh = async () => {
    queryClient.refetchQueries(['Movies']);
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
            {playingData.results.map((movie) => (
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
              data={trendingData.results}
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
      data={upcomingData.results}
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

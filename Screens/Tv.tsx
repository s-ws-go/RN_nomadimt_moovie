import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery, useQueryClient } from 'react-query';
import { TvAPI } from '../api';
import { HLIst } from '../components/HLIst';
import { Loader } from '../components/Loader';

const TvScreen: React.FC<NativeStackScreenProps<any, 'TV'>> = () => {
  const queryClient = useQueryClient();
  const { isLoading: trendingLoading, data: trendingData, isRefetching: trendingRefetching } = useQuery(['Tv', 'trending'], TvAPI.trending);
  const { isLoading: popularLoading, data: popularData, isRefetching: popularRefetching } = useQuery(['Tv', 'popular'], TvAPI.popular);
  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isRefetching: airingTodayRefetching,
  } = useQuery(['Tv', 'airingToday'], TvAPI.airingToday);
  const onRefresh = async () => {
    await queryClient.refetchQueries(['Tv']);
  };
  const loading = trendingLoading || popularLoading || airingTodayLoading;
  const refreshing = trendingRefetching || popularRefetching || airingTodayRefetching;
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 15 }}
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}></RefreshControl>}
    >
      <HLIst title="Trending" data={trendingData.results} />
      <HLIst title="Popular" data={popularData.results} />
      <HLIst title="Airing Today" data={airingTodayData.results} />
    </ScrollView>
  );
};

export default TvScreen;

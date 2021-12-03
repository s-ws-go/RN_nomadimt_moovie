import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery, useQueryClient } from 'react-query';
import { TvAPI } from '../api';
import { HLIst } from '../components/HLIst';
import { Loader } from '../components/Loader';

const TvScreen: React.FC<NativeStackScreenProps<any, 'TV'>> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: trendingLoading, data: trendingData } = useQuery(['Tv', 'trending'], TvAPI.trending);
  const { isLoading: popularLoading, data: popularData } = useQuery(['Tv', 'popular'], TvAPI.popular);
  const { isLoading: airingTodayLoading, data: airingTodayData } = useQuery(['Tv', 'airingToday'], TvAPI.airingToday);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['Tv']);
    setRefreshing(false);
  };
  const loading = trendingLoading || popularLoading || airingTodayLoading;
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

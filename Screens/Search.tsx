import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { MoviesAPI, TvAPI } from '../api';
import { HLIst } from '../components/HLIst';
import { Loader } from '../components/Loader';

const SearchView = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 10px;
  margin: 10px;
  border-radius: 10px;
`;

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const {
    isLoading: SearchMovieLoading,
    data: SearchMovieData,
    refetch: SearchMovieRefetch,
  } = useQuery(['SearchMovie', query], MoviesAPI.search, { enabled: false });
  const {
    isLoading: SearchTVLoading,
    data: SearchTVData,
    refetch: SearchTvRefetch,
  } = useQuery(['SearchTV', query], TvAPI.search, { enabled: false });
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = () => {
    if (query === '') {
      return;
    }
    SearchMovieRefetch();
    SearchTvRefetch();
  };
  const loading = SearchMovieLoading || SearchTVLoading;
  return (
    <SearchView>
      <SearchBar
        placeholder="Search for the MOVIE or TV SHOW"
        placeholderTextColor="gray"
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {loading ? <Loader /> : null}
      {SearchMovieData ? <HLIst title="Searching MOVIE results" data={SearchMovieData.results} /> : null}
      {SearchTVData ? <HLIst title="Searching TV results" data={SearchTVData.results} /> : null}
    </SearchView>
  );
};

export default SearchScreen;

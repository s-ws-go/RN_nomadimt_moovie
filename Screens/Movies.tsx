import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, Image, StyleSheet } from 'react-native';
import { MakingIgmPath } from '../utils';
import { BlurView } from 'expo-blur';
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
  const getNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
    const { results } = await response.json();
    setPlayingMovie(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
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
          <View key={movie.id}>
            <BgImg source={{ uri: MakingIgmPath(movie.backdrop_path) }} style={StyleSheet.absoluteFill} />
            <BlurView intensity={60} style={StyleSheet.absoluteFill}>
              <ContentsContainer>
                <Wrapper>
                  <Title>{movie.title}</Title>
                  <Poster source={{ uri: MakingIgmPath(movie.poster_path) }}></Poster>
                </Wrapper>
                <Wrapper>
                  <Contents>{`${movie.overview.slice(0, 100)}...`}</Contents>
                  <Votes votes={movie.vote_average}></Votes>
                </Wrapper>
              </ContentsContainer>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { MakingIgmPath } from '../utils';
import { BlurView } from 'expo-blur';
import { Text } from 'react-native-paper';

const API_KEY = 'f9fd7b5b380b16d49bec3a9239f19ac0';

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MoviesScreen: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [loading, setLoading] = useState(true);
  const [playingMovie, setPlayingMovie] = useState([]);
  const getNowPlaying = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=kr`);
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
      <Swiper loop timeout={1} controlsEnabled={false} containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
        {playingMovie.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: MakingIgmPath(movie.backdrop_path) }} style={StyleSheet.absoluteFill} />
            <BlurView intensity={60} style={StyleSheet.absoluteFill}>
              <Text>{movie.title}</Text>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default MoviesScreen;

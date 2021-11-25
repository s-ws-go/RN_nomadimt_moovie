import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';

const API_KEY = 'f9fd7b5b380b16d49bec3a9239f19ac0';

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MoviesScreen: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const getNowPlaying = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=kr`);
  };
  return (
    <Container>
      <Swiper loop timeout={1} controlsEnabled={false} containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'blue' }}></View>
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'blue' }}></View>
      </Swiper>
    </Container>
  );
};

export default MoviesScreen;

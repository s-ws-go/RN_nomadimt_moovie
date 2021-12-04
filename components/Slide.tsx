import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, useColorScheme, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Movie } from '../api';
import { MakingIgmPath } from '../utils';
import Poster from './Poster';

const Container = styled.TouchableOpacity`
  flex: 1;
`;

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)')};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fulldata: Movie;
}

const Slide: React.FC<SlideProps> = ({ backdropPath, posterPath, originalTitle, voteAverage, overview, fulldata }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stacks', { screen: 'Details', params: { ...fulldata } });
  };
  const isDark = useColorScheme() === 'dark';
  return (
    <Container onPress={goToDetail}>
      <BgImg style={StyleSheet.absoluteFill} source={{ uri: MakingIgmPath(backdropPath) }} />
      <BlurView tint={isDark ? 'dark' : 'light'} intensity={85} style={StyleSheet.absoluteFill}>
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 ? <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes> : null}
            <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </Container>
  );
};

export default Slide;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { Movie, MoviesAPI, TV, TvAPI } from '../api';
import Poster from '../components/Poster';
import { MakingIgmPath } from '../utils';
import { Ionicons } from '@expo/vector-icons';
import { Loader } from '../components/Loader';
import * as WebBrowser from 'expo-web-browser';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  /* background-color: ${(props) => props.theme.mainBgColor}; */
`;
const Header = styled.View`
  justify-content: flex-end;
  height: ${SCREEN_HEIGHT / 4}px;
  padding: 15px 15px;
`;
const BgImg = styled.Image``;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  align-self: flex-end;
  margin-left: 15px;
  padding-bottom: 15px;
  font-size: 25px;
  font-weight: 600;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Column = styled.View`
  flex-direction: row;
`;

const LinkList = styled.TouchableOpacity`
  margin-left: 15px;
  flex-direction: row;
`;
const LinkText = styled.Text`
  font-size: 13px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: white;
  line-height: 15px;
`;
// Root Navigator가 가지고 있는 Screen의 타입
// 객체 안에 스크린의 이름을 적어준다(Detail)
// key 안에는 route를 통해 전달할 props의 타입
type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export const Details: React.FC<DetailScreenProps> = ({ route: { params }, navigation: { setOptions } }) => {
  const getId = params.id;
  const { isLoading, data } = useQuery(
    ['original_title' in params ? 'Movies' : 'Tv', getId],
    'original_title' in params ? MoviesAPI.detail : TvAPI.detail,
    { enabled: true }
  );

  useLayoutEffect(() => setOptions({ title: 'original_title' in params ? params.original_title : params.original_name }), []);

  const PlayYT = async (linkKey: string) => {
    const getUrl = `https://www.youtube.com/watch?v=${linkKey}`;
    await WebBrowser.openBrowserAsync(getUrl);
  };
  return (
    <Container>
      <Header>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: MakingIgmPath(params.backdrop_path) }} />
        <LinearGradient colors={['transparent', 'black']} style={StyleSheet.absoluteFill} />
        <Column>
          <Poster path={params.poster_path || ''}></Poster>
          <Title>{'original_title' in params ? params.original_title : params.original_name}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      {isLoading ? <Loader /> : null}
      {data?.videos?.results.map((v) => {
        return (
          <LinkList key={v.id} onPress={() => PlayYT(v.key)}>
            <Ionicons name="logo-youtube" size={16} color="white" />
            <LinkText>{v.name}</LinkText>
          </LinkList>
        );
      })}
    </Container>
  );
};

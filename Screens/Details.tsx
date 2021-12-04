import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import Poster from '../components/Poster';

const Container = styled.ScrollView`
  /* background-color: ${(props) => props.theme.mainBgColor}; */
`;

// Root Navigator가 가지고 있는 Screen의 타입
// 객체 안에 스크린의 이름을 적어준다(Detail)
// key 안에는 route를 통해 전달할 props의 타입
type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export const Details: React.FC<DetailScreenProps> = ({ route: { params }, navigation: { setOptions } }) => {
  useLayoutEffect(() => setOptions({ title: 'original_title' in params ? params.original_title : params.original_name }), []);
  return (
    <Container>
      <View>
        <Text>Detail</Text>
        <Poster path={params.poster_path}></Poster>
      </View>
    </Container>
  );
};

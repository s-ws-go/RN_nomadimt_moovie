import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';

const Movie = styled.View`
  align-items: center;
`;
const TrendingTitle = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-top: 5px;
  font-size: 13px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({ posterPath, originalTitle, voteAverage }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stacks', { screen: 'Details', params: { originalTitle } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <TrendingTitle>
          {originalTitle.slice(0, 10)}
          {originalTitle.length > 10 ? '...' : null}
        </TrendingTitle>
        <Votes votes={voteAverage}></Votes>
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;

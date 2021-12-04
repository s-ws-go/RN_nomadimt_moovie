import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';

const HMovies = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  margin-left: 15px;
`;
const HColumn = styled.View`
  width: 60%;
  margin-left: 15px;
`;
const HTitle = styled.Text`
  margin-bottom: 15px;
  color: white;
  font-weight: 600;
`;
const Release = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 5px;
`;
const HOverview = styled(Release)`
  margin-top: 10px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({ posterPath, originalTitle, overview, releaseDate, voteAverage }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stacks', { screen: 'Details', params: { originalTitle } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovies>
        <Poster path={posterPath} />
        <HColumn>
          <HTitle>{originalTitle.length < 30 ? originalTitle : `${originalTitle.slice(0, 30)}...`}</HTitle>
          {releaseDate ? (
            <Release>{new Date(releaseDate).toLocaleDateString('ko', { month: 'long', year: 'numeric', day: 'numeric' })}</Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <HOverview>{`${overview.slice(0, 150)}...`}</HOverview>
        </HColumn>
      </HMovies>
    </TouchableOpacity>
  );
};

export default HMedia;

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const MovieView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const MoviesScreen = () => {
  return (
    <MovieView>
      <Text>Movies</Text>
    </MovieView>
  );
};

export default MoviesScreen;

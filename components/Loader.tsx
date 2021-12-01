import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loader: React.FC = () => {
  return (
    <Wrapper>
      <ActivityIndicator />
    </Wrapper>
  );
};

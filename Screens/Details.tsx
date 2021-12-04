import React, { useEffect, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
  /* background-color: ${(props) => props.theme.mainBgColor}; */
`;

export const Details = ({
  route: {
    params: { originalTitle },
  },
  navigation: { setOptions },
}) => {
  useLayoutEffect(() => setOptions({ title: originalTitle }), []);
  return (
    <Container>
      <View>
        <Text>Detail</Text>
      </View>
    </Container>
  );
};

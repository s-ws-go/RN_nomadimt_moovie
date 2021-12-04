import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import VMedia from '../components/VMedia';

interface HlistProps {
  data: any[];
  title: string;
}

const Title = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
`;

export const Seperator = styled.View`
  width: 15px;
  height: 15px;
`;

export const HLIst: React.FC<HlistProps> = ({ data, title }) => {
  return (
    <>
      <Title>{title}</Title>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name ?? item.original_title}
            voteAverage={item.vote_average}
            fulldata={item}
          />
        )}
        keyExtractor={(item) => item.id + ''}
        ItemSeparatorComponent={() => <Seperator />}
        contentContainerStyle={{ paddingLeft: 15 }}
      />
    </>
  );
};

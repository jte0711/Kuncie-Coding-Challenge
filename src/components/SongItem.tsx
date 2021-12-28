import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

interface SongItemProps {
  album: string;
  albumImage?: string;
  artist: string;
  song: string;
}

const SongItem = ({
  song,
  artist,
  album,
  albumImage,
}: SongItemProps): JSX.Element => {
  return (
    <SongItemWrapper>
      <ImagePlaceholder />
      <ItemDetailsWrapper>
        <Text>{song}</Text>
        <Text>{artist}</Text>
        <Text>{album}</Text>
      </ItemDetailsWrapper>
      {true && <AnimationPlaceholder></AnimationPlaceholder>}
    </SongItemWrapper>
  );
};
const AnimationPlaceholder = styled.View`
  width: 50px;
  height: 50px;

  background-color: green;
`;
const ImagePlaceholder = styled.View`
  width: 50px;
  height: 50px;
  margin-right: 10px;

  background-color: green;
`;

const ItemDetailsWrapper = styled.View`
  flex: 1;
`;

const SongItemWrapper = styled.Pressable`
  background-color: red;
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding-horizontal: 15px;
  padding-vertical: 15px;
`;

export default SongItem;

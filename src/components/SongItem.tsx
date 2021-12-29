import React from "react";
import styled from "styled-components/native";

interface SongItemProps {
  album: string;
  albumImage?: string;
  artist: string;
  song: string;
  previewUrl: string;
}

const SongItem = ({
  song,
  artist,
  album,
  albumImage,
}: SongItemProps): JSX.Element => {
  return (
    <SongItemWrapper>
      {albumImage ? (
        <StyledImage
          style={{ width: 50, height: 50 }}
          source={{ uri: albumImage }}
        />
      ) : (
        <ImagePlaceholder />
      )}
      <ItemDetailsWrapper>
        <SongTitle>{song}</SongTitle>
        <ArtistName>{artist}</ArtistName>
        <AlbumName>{album}</AlbumName>
      </ItemDetailsWrapper>
      {true && <AnimationPlaceholder></AnimationPlaceholder>}
    </SongItemWrapper>
  );
};

const SongTitle = styled.Text`
  color: ${({ theme }) => theme.primary};
`;
const ArtistName = styled.Text`
  color: ${({ theme }) => theme.grey};
`;
const AlbumName = styled.Text`
  color: ${({ theme }) => theme.darkGrey};
`;

const StyledImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

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
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding-horizontal: 15px;
  padding-vertical: 15px;
`;

export default SongItem;

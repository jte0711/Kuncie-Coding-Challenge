import React, { useContext } from "react";
import { BarIndicator } from "react-native-indicators";
import styled, { ThemeContext } from "styled-components/native";

interface SongItemProps {
  album: string;
  albumImage?: string;
  artist: string;
  song: string;
  previewUrl: string;
  trackTime: number;
  trackId: number;
  playing: boolean;
  onPress?: () => void;
}

const SongItem = ({
  song,
  artist,
  album,
  albumImage,
  playing,
  onPress,
}: SongItemProps): JSX.Element => {
  const theme = useContext(ThemeContext);
  return (
    <SongItemWrapper onPress={onPress}>
      {albumImage ? (
        <StyledImage source={{ uri: albumImage }} />
      ) : (
        <ImagePlaceholder />
      )}
      <ItemDetailsWrapper>
        <SongTitle numberOfLines={1}>{song}</SongTitle>
        <ArtistName numberOfLines={1}>{artist}</ArtistName>
        <AlbumName numberOfLines={1}>{album}</AlbumName>
      </ItemDetailsWrapper>
      {playing ? (
        <BarIndicator
          color={theme.white}
          size={20}
          style={{ flex: 0, width: 50, height: 50 }}
        />
      ) : null}
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
  margin-right: 15px;

  border-radius: 10px;
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

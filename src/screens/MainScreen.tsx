import React, { useContext, useState } from "react";
import styled from "styled-components/native";

import { FlatList, StatusBar, Image } from "react-native";
import axios from "axios";

import Searchbar from "@app/components/Searchbar";
import SongItem from "@app/components/SongItem";
import MediaPlayer from "@app/components/MediaPlayer";
import { ThemeContext } from "styled-components/native";

interface Song {
  artistName: string;
  artworkUrl60: string;
  collectionName: string;
  previewUrl: string;
  trackId: number;
  trackName: string;
}

const MainScreen = () => {
  const theme = useContext(ThemeContext);
  const statusBarHeight = StatusBar.currentHeight;
  const [searchResult, setSearchResult] = useState<Song>();
  const [searchTerm, setSearchTerm] = useState();
  const [pause, setPause] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState({
    trackId: "",
    trackName: "",
    previewUrl: "",
    trackRunningTime: 0,
  });

  const onSearch = (searchTerm: string) => {
    const url = `https://itunes.apple.com/search?media=music&entity=song&attribute=artistTerm&term=${searchTerm}`;

    axios.get(url).then((res) => {
      const { results, resultCount } = res.data;

      const filteredResults = results.map((item) => {
        return {
          artistName: item.artistName,
          artworkUrl60: item.artworkUrl60,
          collectionName: item.collectionName,
          trackId: item.trackId,
          trackName: item.trackName,
          trackTimeMillis: item.trackTimeMillis,
          previewUrl: item.previewUrl,
        } as Song;
      });

      setSearchResult(filteredResults);
    });
  };

  return (
    <>
      <StatusBar backgroundColor={theme.background} />

      <Screen style={{ paddingTop: statusBarHeight + 15 }}>
        <StyledSearchbar
          placeholder="Search Artist"
          onSubmitEditing={() => onSearch(searchTerm)}
          value={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <FlatList
          data={searchResult}
          contentContainerStyle={{
            paddingBottom: currentSong.trackName !== "" ? 100 : 0,
          }}
          ListEmptyComponent={() => (
            <EmptyWrapper>
              <EmptyPlaceholderImage
                source={require("../../assets/Welcome.png")}
              />
              <EmptyPlaceholderText numberOfLines={2}>
                Write an artist name to start the app
              </EmptyPlaceholderText>
            </EmptyWrapper>
          )}
          renderItem={({ item }) => {
            return (
              <SongItem
                key={item.trackId}
                song={item.trackName}
                artist={item.artistName}
                album={item.collectionName}
                albumImage={item.artworkUrl60}
                previewUrl={item.previewUrl}
                trackId={item.trackId}
                playing={currentSong.trackId === item.trackId}
                onPress={() => {
                  setCurrentSong({
                    trackId: item.trackId,
                    trackName: item.trackName,
                    previewUrl: item.previewUrl,
                    trackRunningTime: null,
                  });
                }}
              />
            );
          }}
        />
      </Screen>
      {currentSong.trackName !== "" && (
        <MediaPlayer
          pause={pause}
          setPause={setPause}
          trackName={currentSong.trackName}
          previewUrl={currentSong.previewUrl}
        />
      )}
    </>
  );
};

const EmptyWrapper = styled.View`
  width: 100%;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.white};
  border-radius: 20px;
`;

const EmptyPlaceholderText = styled.Text`
  color: ${({ theme }) => theme.lightBackground};
  font-size: 26px;
  font-weight: 300;
  max-width: 250px;
  text-align: center;
  padding-bottom: 20px;
`;

const EmptyPlaceholderImage = styled.Image`
  width: 250px;
  height: 350px;
`;

const StyledSearchbar = styled(Searchbar)`
  margin-bottom: 20px;
`;

const Screen = styled.SafeAreaView`
  padding-horizontal: 15px;
  height: 100%;

  background-color: ${({ theme }) => theme.background};
`;

export default MainScreen;

import React, { useState } from "react";
import styled from "styled-components/native";

import { FlatList, StatusBar, View, Text } from "react-native";
import axios from "axios";

import Searchbar from "@app/components/Searchbar";
import SongItem from "@app/components/SongItem";
import MediaPlayer from "@app/components/MediaPlayer";

interface Song {
  artistName: string;
  artworkUrl60: string;
  collectionName: string;
  previewUrl: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
}

const MainScreen = () => {
  const statusBarHeight = StatusBar.currentHeight;
  const [searchResult, setSearchResult] = useState<Song>();
  const [searchTerm, setSearchTerm] = useState();
  const [pause, setPause] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState({
    trackId: "",
    trackName: "",
    trackTime: 0,
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
            <View style={{ width: "100%", height: 50, backgroundColor: "red" }}>
              <Text>EMPTY LIST</Text>
            </View>
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
                trackTime={item.trackTimeMillis}
                trackId={item.trackId}
                playing={currentSong.trackId === item.trackId}
                onPress={() => {
                  setCurrentSong({
                    trackId: item.trackId,
                    trackName: item.trackName,
                    trackTime: item.trackTimeMillis,
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
          trackTime={currentSong.trackTime}
        />
      )}
    </>
  );
};

const StyledSearchbar = styled(Searchbar)`
  margin-bottom: 20px;
`;

const Screen = styled.SafeAreaView`
  padding-horizontal: 15px;
  height: 100%;

  background-color: ${({ theme }) => theme.background};
`;

export default MainScreen;

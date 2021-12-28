import React, { useState } from "react";
import styled from "styled-components/native";

import { FlatList, StatusBar, View, Text } from "react-native";
import axios from "axios";

import SearchbarWrapper from "@app/components/Searchbar";
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
          trackTimeMillis: item.tracktimeMillis,
          previewUrl: item.previewUrl,
        } as Song;
      });

      setSearchResult(filteredResults);
    });
  };

  return (
    <Screen style={{ paddingTop: statusBarHeight + 15 }}>
      <Searchbar
        placeholder="Search"
        onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
      />
      <FlatList
        data={searchResult}
        ListEmptyComponent={() => (
          <View style={{ width: "100%", height: 50, backgroundColor: "red" }}>
            <Text>EMPTY LIST</Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <SongItem
              song={item.trackName}
              artist={item.artistName}
              album={item.collectionName}
              albumImage={item.artworkUrl60}
              previewUrl={item.previewUrl}
            />
          );
        }}
      />
      <MediaPlayer />
    </Screen>
  );
};

const Searchbar = styled(SearchbarWrapper)`
  margin-bottom: 20px;
`;

const Screen = styled.SafeAreaView`
  margin-horizontal: 15px;
  height: 100%;
`;

export default MainScreen;

import React from "react";
import styled from "styled-components/native";

import SearchbarWrapper from "@app/components/Searchbar";
import { FlatList, StatusBar } from "react-native";
import SongItem from "@app/components/SongItem";
import MediaPlayer from "@app/components/MediaPlayer";

const mockData = [
  {
    song: "Feeling",
    singer: "Lauv",
    album: "how i'm feeling",
    albumArt: "path",
  },
  {
    song: "Mean It",
    singer: "Lauv",
    album: "i'm feeling",
    albumArt: "path",
  },
  {
    song: "i'm so tired",
    singer: "Lauv",
    album: "i'm feeling",
    albumArt: "path",
  },
  {
    song: "fuck, i'm lonely",
    singer: "Lauv",
    album: "i'm feeling",
    albumArt: "path",
  },
];

const MainScreen = () => {
  const statusBarHeight = StatusBar.currentHeight;
  return (
    <Screen style={{ paddingTop: statusBarHeight + 15 }}>
      <Searchbar placeholder="Search" />
      <FlatList
        data={mockData}
        renderItem={({ item }) => {
          return (
            <SongItem
              song={item.song}
              artist={item.singer}
              album={item.album}
              albumImage={item.albumArt}
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

import React, { Dispatch, useContext } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import * as TimeFormat from "hh-mm-ss";
// import ProgressBar from "react-native-progress/Bar";
import { ProgressBar } from "react-native-paper";

interface MediaPlayerProps {
  pause: boolean;
  setPause: Dispatch<boolean>;
  trackName: string;
  trackTime: number;
}

const MediaPlayer = ({
  pause,
  setPause,
  trackName,
  trackTime,
}: MediaPlayerProps): JSX.Element => {
  const theme = useContext(ThemeContext);
  const timeString = TimeFormat.fromMs(trackTime);

  return (
    <MPWrapper>
      <SongDetails>
        <View style={{ flexDirection: "row" }}>
          <SongText style={{ width: 50 }}>{timeString}</SongText>
          <SongText>{trackName}</SongText>
        </View>
        <View style={{ width: "100%", height: 10 }}>
          <ProgressBar progress={0.5} color={theme.lightGreen} />
        </View>
      </SongDetails>
      <Ionicons
        color={theme.lightGreen}
        name={pause ? "pause-circle" : "play-circle"}
        size={65}
        onPress={() => setPause(!pause)}
      />
    </MPWrapper>
  );
};
const SongText = styled.Text`
  color: ${({ theme }) => theme.primary};
`;

const SongDetails = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-left: 15px;
  margin-right: 20px;
  height: 100%;
`;

const MPWrapper = styled.View`
  width: 100%;
  height: 100px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-horizontal: 10px;
  padding-vertical: 15px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background-color: ${({ theme }) => theme.lightBackground};
  opacity: 0.98;
  position: absolute;
  bottom: 0px;
`;

export default MediaPlayer;

import React, { Dispatch, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import date from "date-and-time";
import { ProgressBar } from "react-native-paper";
import { Audio } from "expo-av";

interface MediaPlayerProps {
  pause: boolean;
  setPause: Dispatch<boolean>;
  trackName: string;
  trackTime: number;
  previewUrl: string;
}

const MediaPlayer = ({
  pause,
  setPause,
  trackName,
  trackTime,
  previewUrl,
}: MediaPlayerProps): JSX.Element => {
  const theme = useContext(ThemeContext);
  const maxPreviewTime = 30000;
  const [sound, setSound] = useState();
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadNewSong = async (url) => {
    setPause(false);
    setFinished(false);
    const { sound } = await Audio.Sound.createAsync({ uri: url }, {}, (e) => {
      setProgress(e.positionMillis);
      if (e.didJustFinish) {
        setPause(true);
        setFinished(true);
      }
    });
    setSound(sound);
    await sound.playAsync();
  };

  const playPauseHandler = async () => {
    if (pause) {
      finished
        ? await sound.setStatusAsync({ shouldPlay: true, positionMillis: 0 })
        : await sound.playAsync();
    } else {
      await sound.pauseAsync();
    }
  };

  useEffect(() => {
    loadNewSong(previewUrl);
  }, [trackName]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <MPWrapper>
      <SongDetails>
        <View style={{ flexDirection: "row" }}>
          <SongText style={{ width: 50 }}>
            {date.format(new Date(maxPreviewTime - progress), "mm:ss")}
          </SongText>
          <SongText>{trackName}</SongText>
        </View>
        <View style={{ width: "100%", height: 10 }}>
          <ProgressBar
            progress={progress / 30000 || 0}
            color={theme.lightGreen}
          />
        </View>
      </SongDetails>
      <Ionicons
        color={theme.lightGreen}
        name={pause ? "play-circle" : "pause-circle"}
        size={65}
        onPress={() => {
          if (pause) {
            setPause(false);
            playPauseHandler();
          } else {
            setPause(true);
            playPauseHandler();
          }
        }}
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

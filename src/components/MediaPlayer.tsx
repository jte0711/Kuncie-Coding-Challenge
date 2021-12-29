import React, { useState } from "react";
import styled from "styled-components/native";

const MediaPlayer = () => {
  const [showPlayButton, setShowPlayButton] = useState(true);
  return (
    <MPWrapper>
      <IconPlaceholder />
      <PlayPlaceholder
        onPress={() => setShowPlayButton(!showPlayButton)}
        style={{ backgroundColor: showPlayButton ? "red" : "green" }}
      />
      <IconPlaceholder />
    </MPWrapper>
  );
};

const IconPlaceholder = styled.Pressable`
  width: 50px;
  height: 50px;

  background-color: ${({ theme }) => theme.grey};
`;

const PlayPlaceholder = styled.Pressable`
  width: 50px;
  height: 50px;

  background-color: ${({ theme }) => theme.primary};
`;

const MPWrapper = styled.View`
  width: 100%;
  height: 120px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  position: absolute;

  bottom: 0px;
`;

export default MediaPlayer;

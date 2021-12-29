import React, { useContext } from "react";
import { TextInputProps } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Searchbar = ({ style, ...props }: TextInputProps): JSX.Element => {
  const theme = useContext(ThemeContext);
  return (
    <SearchbarWrapper style={style}>
      <StyledSearchIcon
        name="search-outline"
        size={20}
        color={theme.background}
      />
      <StyledTextInput {...props} />
      <Ionicons name="close-outline" size={20} color={theme.background} />
    </SearchbarWrapper>
  );
};

const StyledTextInput = styled.TextInput`
  align-self: center;
  flex: 1;
`;

const StyledSearchIcon = styled(Ionicons)`
  margin-right: 10px;
`;

const SearchbarWrapper = styled.View`
  border-radius: 100px;
  background-color: ${({ theme }) => theme.primary};
  align-items: center;
  flex-direction: row;

  padding-vertical: 10px;
  padding-horizontal: 15px;
`;

export default Searchbar;

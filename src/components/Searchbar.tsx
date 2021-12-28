import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

const SearchbarWrapper = (props: TextInputProps): JSX.Element => {
  return <Searchbar {...props} />;
};

const Searchbar = styled.TextInput`
  border-width: 1px;
  border-color: grey;
  border-radius: 10px;

  padding: 10px;
`;

export default SearchbarWrapper;

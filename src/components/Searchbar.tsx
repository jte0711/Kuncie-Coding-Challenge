import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

const SearchbarWrapper = (props: TextInputProps): JSX.Element => {
  return <Searchbar {...props} />;
};

const Searchbar = styled.TextInput`
  border-radius: 100px;
  background-color: ${({ theme }) => theme.primary};

  padding-vertical: 5px;
  padding-horizontal: 15px;
`;

export default SearchbarWrapper;

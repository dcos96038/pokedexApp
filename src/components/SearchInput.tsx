import React, {useEffect, useState} from "react";
import {StyleSheet, View, TextInput} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import useDebounce from "../hooks/useDebounce";

interface Props {
  onDebounce: (value: string) => void;
}

const SearchInput = ({onDebounce}: Props) => {
  const [textValue, setTextValue] = useState("");

  const debouncedTextValue = useDebounce(textValue, 500);

  useEffect(() => {
    onDebounce(debouncedTextValue);
  }, [debouncedTextValue]);

  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for Pokemon"
          style={styles.textInput}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon color="grey" name="search-outline" size={30} />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: "#F3F1F3",
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});

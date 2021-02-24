import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/colors";
const { input } = colors;

const LargeInput = ({ setFunction, placeholder, value }) => {
  return (
    <TextInput
      style={styles.textArea}
      placeholder={placeholder}
      multiline={true}
      numberOfLines={3}
      value={value}
      onChangeText={(text) => {
        setFunction(text);
      }}
    />
  );
};

export default LargeInput;

const styles = StyleSheet.create({
  textArea: {
    width: "80%",
    borderWidth: 1,
    borderColor: input,
    borderRadius: 5,
    height: 70,
    marginTop: 10,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

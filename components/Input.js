import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/colors";
const { input } = colors;

const Input = ({ setFunction, secureTextEntry, placeholder, value }) => {
  return (
    <TextInput
      style={styles.textInput}
      secureTextEntry={secureTextEntry ? true : false}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        setFunction(text);
      }}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomColor: input,
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 30,
    fontSize: 16,
  },
});

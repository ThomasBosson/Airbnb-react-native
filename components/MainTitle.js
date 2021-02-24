import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../assets/colors";
const { title } = colors;

const MainTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default MainTitle;

const styles = StyleSheet.create({
  title: {
    color: title,
    fontWeight: "600",
    fontSize: 24,
  },
});

import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import colors from "../assets/colors";
const { input, bg, title } = colors;

const PriceOffer = ({ price }) => {
  return (
    <View style={styles.priceDisplay}>
      <Text style={styles.price}>{price} €</Text>
    </View>
  );
};

export default PriceOffer;

const styles = StyleSheet.create({
  priceDisplay: {
    width: 80,
    height: 30,
    backgroundColor: input,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});

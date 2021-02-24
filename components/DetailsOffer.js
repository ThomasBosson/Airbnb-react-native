import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../assets/colors";
const { input, bg, title } = colors;

//
const stars = (num) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (num < i) {
      stars.push(
        <FontAwesome
          style={styles.star}
          name="star"
          size={15}
          color="#BBBBBB"
        />
      );
    } else {
      stars.push(
        <FontAwesome
          style={styles.star}
          name="star"
          size={15}
          color="#FFB100"
        />
      );
    }
  }
  return stars;
};

const DetailsOffer = ({ title, ratingValue, reviews, pic }) => {
  return (
    <View style={styles.details}>
      <View style={styles.display}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rating}>
          <View style={styles.stars}>
            <Text>{stars(ratingValue)}</Text>
          </View>
          <Text>{reviews} reviews</Text>
        </View>
      </View>
      <Image
        style={styles.profilePic}
        source={{
          uri: pic,
        }}
      />
    </View>
  );
};

export default DetailsOffer;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  display: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  stars: {
    marginRight: 10,
  },
});

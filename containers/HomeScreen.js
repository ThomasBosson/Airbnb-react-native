import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

// Provides system information that remains constant throughout the lifetime of your app's install.
import Constants from "expo-constants";
console.log(Constants.statusBarHeight);
console.log(Platform.OS);

// Colors
import colors from "../assets/colors";
const { bg, input } = colors;

// Components
import DetailsOffer from "../components/DetailsOffer";
import PriceOffer from "../components/PriceOffer";

export default function HomeScreen() {
  // State declaration
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={input} />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("room", { id: item._id });
                }}
              >
                <ImageBackground
                  source={{ uri: item.photos[0].url }}
                  style={styles.image}
                >
                  <PriceOffer price={item.price} />
                </ImageBackground>
                <DetailsOffer
                  title={item.title}
                  ratingValue={item.ratingValue}
                  reviews={item.reviews}
                  pic={item.user.account.photo.url}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: bg,
  },
  btn: {
    height: 300,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    flex: 1,
  },
});

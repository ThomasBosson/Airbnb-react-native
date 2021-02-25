import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
} from "react-native";

// Colors
import colors from "../assets/colors";
const { bg, input, title } = colors;

// Components

export default function RoomScreen({ route }) {
  // State declaration
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // UseEffect declaration : authorization + get coords
  useEffect(() => {
    try {
      // Get user's permission using his data
      const askPermission = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status === "granted") {
          // get rooms around user
          const location = await Location.getCurrentPositionAsync();
          let response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          // get all rooms
          let response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }
        // Get user's coords (incoming)

        setData();
        setIsLoading(false);
      };
      askPermission();
    } catch (error) {
      alert("An error occurred");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={input} />
      ) : (
        <SafeAreaView style={styles.safeAreaView}>
          <Text>Hello</Text>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: bg,
  },
});

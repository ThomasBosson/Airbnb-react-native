import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

// Colors
import colors from "../assets/colors";
const { bg, input, title } = colors;

// Components

export default function RoomScreen({ route }) {
  // State declaration
  const [data, setData] = useState();
  const [coords, setCoords] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const askPermission = async () => {
      try {
        // Get user's permission using his location
        let { status } = await Location.requestPermissionsAsync();

        // If user accepts...
        if (status === "granted") {
          // get, storage his location and display announces around him
          let location = await Location.getCurrentPositionAsync({});
          const obj = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setCoords(obj);
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setData(response.data);

          // Else, if user refuses...
        } else {
          // Get and display all announces
          const response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
          setData(response.data);
        }

        // error application
      } catch (error) {
        alert("An error occured");
      }
      setIsLoading(false);
    };
    askPermission();
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={input} />
      ) : (
        <SafeAreaView style={styles.safeAreaView}>
          <View>
            <MapView
              style={styles.mapView}
              initialRegion={{
                latitude: data[0].location[1],
                longitude: data[0].location[0],
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation={true}
            >
              {data.map((user) => {
                return (
                  <MapView.Marker
                    key={user._id}
                    coordinate={{
                      latitude: user.location[1],
                      longitude: user.location[0],
                    }}
                    onPress={() =>
                      navigation.navigate("room", {
                        id: user._id,
                      })
                    }
                  />
                );
              })}
            </MapView>
          </View>
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
  mapView: {
    height: "100%",
    width: "100%",
  },
});

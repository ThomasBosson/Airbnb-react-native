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
const { bg, input } = colors;

// Components
import PriceOffer from "../components/PriceOffer";
import DetailsOffer from "../components/DetailsOffer";

export default function RoomScreen({ route }) {
  // State declaration
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [displayFullText, setDisplayFullText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={input} />
      ) : (
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView>
            <View>
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: data.photos[0].url }}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.priceBox}>
                <PriceOffer price={data.price} />
              </View>
            </View>

            <View style={styles.infos}>
              <DetailsOffer
                title={data.title}
                pic={data.user.account.photo.url}
                reviews={data.reviews}
              />
            </View>
            <Text style={styles.description}>{data.description}</Text>
            <MapView
              style={styles.mapView}
              initialRegion={{
                latitude: data.location[1],
                longitude: data.location[0],
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation={true}
            >
              <MapView.Marker
                coordinate={{
                  latitude: data.location[1],
                  longitude: data.location[0],
                }}
                title={data.title}
              />
            </MapView>
          </ScrollView>
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
  image: {
    flex: 1,
    height: 300,
  },
  priceBox: {
    position: "absolute",
    top: 0,
  },
  infos: {
    marginHorizontal: 20,
  },
  description: {
    marginHorizontal: 10,
    lineHeight: 20,
    marginBottom: 10,
  },
  mapView: {
    height: 400,
    width: "100%",
    marginTop: 10,
  },
});

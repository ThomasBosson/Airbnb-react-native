import React, { useEffect, useState } from "react";
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
    bottom: 0,
  },
  infos: {
    marginHorizontal: 20,
  },
  description: {
    marginHorizontal: 10,
    lineHeight: 20,
    marginBottom: 10,
  },
});

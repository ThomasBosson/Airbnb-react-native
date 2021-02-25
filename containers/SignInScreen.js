import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from "react-native";

// ScrollView component that handles keyboard appearance and automatically scrolls to focused TextInput
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Provides system information that remains constant throughout the lifetime of your app's install.
import Constants from "expo-constants";
console.log(Constants.statusBarHeight);
console.log(Platform.OS);

// Colors
import colors from "../assets/colors";
const { bg, title, input } = colors;

// Components
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      if (email && password) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        setToken(response.data.token);
        alert("Connection successfull");
      } else {
        setErrorMessage("Please fill all fields !");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Incorrect password and/or email, please try again !");
      }
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <KeyboardAwareScrollView>
        <View style={styles.view}>
          <Logo size={"large"} />
          <MainTitle title={"SIGN IN"} />
        </View>

        <View style={styles.view}>
          <Input placeholder={"Email"} value={email} setFunction={setEmail} />
          <Input
            placeholder={"Password"}
            secureTextEntry={true}
            value={password}
            setFunction={setPassword}
          />
        </View>

        <View style={styles.view}>
          <Text style={styles.error}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.btn}
            title="Sign in"
            onPress={handlePress}
          >
            <Text style={styles.text}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.redirect}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: bg,
    flex: 1,
  },
  view: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  btn: {
    height: 60,
    width: "50%",
    borderColor: input,
    borderWidth: 3,
    borderRadius: 60,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: title,
    fontWeight: "500",
    fontSize: 18,
  },
  redirect: {
    color: title,
  },
  error: {
    color: input,
    marginBottom: 20,
  },
});

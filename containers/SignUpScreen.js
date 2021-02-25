import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Colors
import colors from "../assets/colors";
const { bg, title, input } = colors;

// Components
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";

// Provides system information that remains constant throughout the lifetime of your app's install.
import Constants from "expo-constants";
console.log(Constants.statusBarHeight);
console.log(Platform.OS);

export default function SignUpScreen({ setToken }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      if (email && username && description && password) {
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          setToken(response.data.token);
          alert("Register successfull");
        } else {
          setErrorMessage("Your passwords don't match !");
        }
      } else {
        setErrorMessage("Please fill all fields");
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
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
          <MainTitle title={"SIGN UP"} />
        </View>

        <View style={styles.view}>
          <Input placeholder={"email"} value={email} setFunction={setEmail} />
          <Input
            placeholder={"username"}
            value={username}
            setFunction={setUsername}
          />
          <LargeInput
            placeholder="Describe yourself in few words..."
            value={description}
            setFunction={setDescription}
          />
          <Input
            placeholder={"password"}
            secureTextEntry={true}
            value={password}
            setFunction={setPassword}
          />
          <Input
            placeholder={"confirm password"}
            secureTextEntry={true}
            value={confirmPassword}
            setFunction={setConfirmPassword}
          />
        </View>

        <View style={styles.view}>
          <Text style={styles.error}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.btn}
            title="Sign up"
            onPress={handlePress}
          >
            <Text style={styles.text}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.redirect}>Alreadyhave a account? Sign in</Text>
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
    marginBottom: 50,
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

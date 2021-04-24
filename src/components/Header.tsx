import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImg from "../assets/avatar.jpg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadUserFromStorage() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUserName(user || "");
    }

    loadUserFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetings}>Olá,</Text>
        <Text style={styles.name}>{userName}</Text>
      </View>
      <Image source={userImg} style={styles.image}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
    padding: 30,
  },
  greetings: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  name: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 28,
  },
});

export default Header;

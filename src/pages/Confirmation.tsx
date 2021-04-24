import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const Confirmation: React.FC = () => {
  const navigation = useNavigation();

  const handleConfirm = useCallback(() => {
    navigation.navigate("PlantSelect");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😁</Text>

        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button text="Começar" onPress={handleConfirm} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 30,
  },
  emoji: {
    fontSize: 80,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 30,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 25,
    paddingVertical: 10,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});

export default Confirmation;

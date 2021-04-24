import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

const PlantCardPrimary: React.FC<PlantProps> = ({ data, ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri
        uri={data.photo}
        width={70}
        height={70}
        style={{ marginTop: 16 }}
      />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginBottom: 16,
    marginTop: 8,
  },
});

export default PlantCardPrimary;

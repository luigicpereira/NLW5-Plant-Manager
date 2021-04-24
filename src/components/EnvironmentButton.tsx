import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentButtonProps extends RectButtonProps {
  text: string;
  active?: boolean;
}

const EnvironmentButton: React.FC<EnvironmentButtonProps> = ({
  text,
  active = false,
  ...rest
}) => {
  return (
    <RectButton
      style={[styles.container, active && styles.containerActive]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.textActive]}>{text}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginRight: 4,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});

export default EnvironmentButton;

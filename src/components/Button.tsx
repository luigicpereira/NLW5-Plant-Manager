import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});

export default Button;

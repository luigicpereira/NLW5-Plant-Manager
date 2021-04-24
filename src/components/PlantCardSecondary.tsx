import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import {
  RectButton,
  RectButtonProps,
  Swipeable,
} from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

const PlantCardSecondary: React.FC<PlantProps> = ({
  data,
  handleRemove,
  ...rest
}) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View
          style={{
            height: "100%",
            marginTop: 5,
            paddingBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <RectButton style={styles.removeButton} onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri
          uri={data.photo}
          width={50}
          height={50}
          style={{ marginTop: 16 }}
        />

        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },
  details: {
    alignItems: "flex-end",
    marginHorizontal: 5,
  },
  timeLabel: {
    fontSize: 15,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 3,
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  removeButton: {
    width: 120,
    // height: 95,
    backgroundColor: colors.red,
    // marginTop: 7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    right: 40,
    marginRight: -40,
    paddingLeft: 40,
    flex: 1,
  },
});

export default PlantCardSecondary;

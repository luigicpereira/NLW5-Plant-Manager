import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import Header from "../components/Header";
import colors from "../styles/colors";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import waterdrop from "../assets/waterdrop.png";
import { loadPlants, PlantProps, removePlant } from "../libs/storage";
import { FlatList } from "react-native-gesture-handler";
import fonts from "../styles/fonts";
import PlantCardSecondary from "../components/PlantCardSecondary";
import Load from "../components/Load";

const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPlantWaterTip, setNextPlantWaterTip] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😢",
        style: "default",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldPlants) =>
              oldPlants.filter((oldPlant) => oldPlant.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover! 😢");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      if (!plantsStoraged.length) {
        setLoading(false);
        return;
      }

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextPlantWaterTip(
        `Não esqueça de regar a ${plantsStoraged[0].name} em ${nextTime}.`
      );
      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextPlantWaterTip}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item: PlantProps) => String(item.id)}
          renderItem={({ item }: { item: PlantProps }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => {
                handleRemove(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spotlightImage: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 10,
    fontFamily: fonts.text,
    fontSize: 15,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});

export default MyPlants;

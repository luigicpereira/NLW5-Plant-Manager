import { loadAsync } from "expo-font";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import EnvironmentButton from "../components/EnvironmentButton";
import Header from "../components/Header";
import Load from "../components/Load";
import PlantCardPrimary from "../components/PlantCardPrimary";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

const PlantSelect: React.FC = () => {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setfilteredPlants] = useState<PlantProps[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  const handleSelectEnvironment = useCallback((environment: string) => {
    setSelectedEnvironment(environment);

    if (environment === "all") {
      setfilteredPlants(plants);
      return;
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setfilteredPlants(filtered);
  }, []);

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=6`
    );

    if (!data) {
      setLoadedAll(true);
      return;
    }

    if (loadedAll) {
      return;
    }

    if (page > 1) {
      setPlants((currentPlants) => [...currentPlants, ...data]);
      setfilteredPlants((currentFilteredPlants) => [
        ...currentFilteredPlants,
        ...data,
      ]);
    } else {
      setPlants(data);
      setfilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  const handleFetchMore = useCallback((distance: number) => {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage((currentPage) => currentPage + 1);
    fetchPlants();
  }, []);

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              text={item.title}
              active={item.key === selectedEnvironment}
              onPress={() => handleSelectEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            handleFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
    paddingRight: 64,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
  },
});

export default PlantSelect;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../pages/Welcome";
import UserIdentification from "../pages/UserIdentification";
import Confirmation from "../pages/Confirmation";

import colors from "../styles/colors";
import PlantSave from "../pages/PlantSave";
import TabRoutes from "./tab.routes";

const stackRoutes = createStackNavigator();

const StackRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <stackRoutes.Screen
        name="Welcome"
        component={Welcome}
      ></stackRoutes.Screen>

      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification}
      ></stackRoutes.Screen>

      <stackRoutes.Screen
        name="Confirmation"
        component={Confirmation}
      ></stackRoutes.Screen>

      <stackRoutes.Screen
        name="PlantSelect"
        component={TabRoutes}
      ></stackRoutes.Screen>

      <stackRoutes.Screen
        name="PlantSave"
        component={PlantSave}
      ></stackRoutes.Screen>

      <stackRoutes.Screen
        name="MyPlants"
        component={TabRoutes}
      ></stackRoutes.Screen>
    </stackRoutes.Navigator>
  );
};

export default StackRoutes;

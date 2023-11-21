import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screens";
import ItemScreen from "../components/home/ItemScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

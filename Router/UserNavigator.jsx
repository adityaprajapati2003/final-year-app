import React from "react";
import CryptoWallet from "../components/user/CryptoWallet";
import { createStackNavigator } from "@react-navigation/stack";
import { MemoizedUserProvider } from "../screens";

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="userprovider"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="userprovider" component={MemoizedUserProvider} />
      <Stack.Screen name="cryptowallet" component={CryptoWallet} />
    </Stack.Navigator>
  );
};

export default UserNavigator;

import { useFonts } from "expo-font";
import ReactNavigation from "./Router/ReactNavigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./toolkit/store";
import React, { useEffect } from 'react';
import { NativeBaseProvider } from "native-base";
import AuthNavigator from "./Router/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "./toolkit/reducers/UserAuth";
import * as NavigationBar from 'expo-navigation-bar';
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        const savedAsString = JSON.parse(savedUser);
        const { email } = savedAsString;
        dispatch(login({ email }));
      }
    }
    NavigationBar.setBackgroundColorAsync("#f0f2f1");
    NavigationBar.setButtonStyleAsync("dark");

    getUser();
  }, [dispatch]);


  let [font] = useFonts({ 'Pregular': require('./assets/fonts/FontsFree-Net-OCPajaro-Regular.ttf'),
                          'Brusher': require('./assets/fonts/Brusher.ttf') })
  if (!font) { return <></> }

  if (isLoggedIn) {
    return (
      <GestureHandlerRootView style={{flex:1}}>
        <NativeBaseProvider>
          <ReactNavigation onLayout={font} />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    )
  } else {
    return (
      <AuthNavigator onLayout={font} />
    )
  }
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

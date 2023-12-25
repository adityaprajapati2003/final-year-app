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
import * as Network from 'expo-network';

function App() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const checkNetworkConnection = async () => {
    const isConnected = await Network.getNetworkStateAsync();

    if (!isConnected.isInternetReachable) {
      // No internet connection, show an alert and close the app
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [{ text: 'OK', onPress: () => closeApp() }]
      );
    }
  };
  const closeApp = () => {
    // You can customize this part based on your app's navigation structure
    // For example, if you are using React Navigation, you can use navigation.goBack() or navigation.navigate('Home')
    // In a bare React Native project, you might use BackHandler.exitApp()
    // In this example, we're using the Expo method to close the app
    Expo.WebBrowser.dismissBrowser();
    Expo.App.manifest.exit();
  };

  useEffect(() => {
    checkNetworkConnection();
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

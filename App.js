import { useFonts } from "expo-font";
import ReactNavigation from "./Router/ReactNavigation";
import { Provider, useDispatch ,useSelector} from "react-redux";
import { store } from "./toolkit/store";
import React, { useEffect } from 'react';
import { NativeBaseProvider} from "native-base";
import { View,Text } from "react-native";
import AuthNavigator from "./Router/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "./toolkit/reducers/UserAuth";
import * as NavigationBar from 'expo-navigation-bar';


function App (){ 
  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);

  const dispatch = useDispatch();
  const getUser = async()=>{

    const savedUser = await AsyncStorage.getItem("user");
    
    if(savedUser){
      const savedUserAsString = JSON.parse(savedUser);
      const {email,password} = savedUserAsString;
      dispatch(login({email,password}));
    }
  }
  getUser();
  NavigationBar.setBackgroundColorAsync("#f0f2f1");
  NavigationBar.setButtonStyleAsync("dark");


  let [font]=useFonts({
    'Pregular':require('./assets/fonts/FontsFree-Net-OCPajaro-Regular.ttf'),
  })
  
  if(!font){
    return <View><Text>bbbb</Text></View>
  }
  
  if(isLoggedIn){
    return (
      <NativeBaseProvider>
        <ReactNavigation onLayout={font}/>
      </NativeBaseProvider>
      )
  
  }else{
    return <AuthNavigator onLayout={font}/>
  }
}

export default ()=>{
  
  return(
    <Provider store={store}>
        <App/>
    </Provider>
  )
}

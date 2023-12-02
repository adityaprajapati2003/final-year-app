import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen"
import { useNavigation } from '@react-navigation/native'
import { COLORS, COMMONTEXT, TEXTCOLOR, image} from '../constants'
import Login from './forms/Login'
import { SimpleAnimation } from 'react-native-simple-animations';

const Signin = () => {

  const takeMeTo = useNavigation();

  return (
       <KeyboardAvoidingView> 
        {/* this help to avoid Keyboard errors */}
          <SafeAreaView style={styles.MainContainer}>
            <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
              {/* Login Page imported */}
              <Login/>
              <View>
                <TouchableOpacity onPress={()=>takeMeTo.navigate('signup')}>
                  <Text style={styles.TextNav}>Create a new account ? Sign Up</Text>
                </TouchableOpacity>
              </View>
              </SimpleAnimation>
          </SafeAreaView>
      </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  MainContainer:{
    backgroundColor:COLORS.baseWhite,
    height:vh(105),
    paddingLeft:vw(10),
    paddingRight:vw(10),
    paddingTop:vh(2),
    alignItems:'center',
  },
  TextNav:{
    ...COMMONTEXT.primary,
    color:TEXTCOLOR.secondary,
    marginTop:vh(3),
    minHeight:vh(4),
    alignSelf:'center',
  },
});

export default Signin;
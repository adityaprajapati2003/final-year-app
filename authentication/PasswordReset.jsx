import { KeyboardAvoidingView, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Forgot from './forms/Forgot'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen"
import { COLORS ,TEXTCOLOR,COMMONTEXT} from '../constants'
import { useNavigation } from '@react-navigation/native'

const PasswordReset = () => {
    const takeMeTo = useNavigation();

  return (
   <KeyboardAvoidingView>
    <SafeAreaView>
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.hello}>Forgot Password ?</Text>
                <Text style={styles.Text}>You will receive an mail at your email please sent your password again via clicking on link provided!</Text>
            </View>
            <Forgot/>
          <TouchableOpacity onPress={()=>takeMeTo.navigate('signin')}>
            <Text style={{...COMMONTEXT.semisecondary,marginTop:vh(2),alignSelf:'center',color:TEXTCOLOR.secondary}}>Login again ?</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
   </KeyboardAvoidingView>
  )
}

export default PasswordReset

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:COLORS.baseWhite,
        height:vh(105),
        paddingLeft:vw(10),
        paddingRight:vw(10),
        paddingTop:vh(20),
    },
    hello: {
        height: vh(5),
        alignSelf:'center',
        color: TEXTCOLOR.secondary,
        ...COMMONTEXT.fourth,
    },
    Text:{
        ...COMMONTEXT.secondary,
    }
})
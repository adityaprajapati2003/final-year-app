import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";

export default function Menu({category}) {
  console.log(category);
  return (
   <></>
  )
}
const styles=StyleSheet.create({
  mainView:{
    justifyContent:'center',
    alignItems:'center',
    height:vh(100),
  },
  commonText:{
    fontFamily:'Ebold',
    fontSize:20
  }
})
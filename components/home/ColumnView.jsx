import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { urlFor } from "../../sanity";
import React from "react";
import { COMMONTEXT , TEXTCOLOR, icons} from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ColumnView = ({ item, index }) => {

  const takeMeTo = useNavigation();

  return (
    <View>
      <TouchableWithoutFeedback onPress={()=>takeMeTo.navigate('ItemScreen',{...item})}>
        <View className='shadow-2xl shadow-slate-900 rounded-3xl bg-slate-300' style={{height:vh(30),margin:10}}>
          <Image source={{uri:urlFor(item.image).url()}} style={styles.Image} />
          <View className='flex flex-row backdrop-blur-md bg-gray-800/50 rounded-3xl p-3 -mt-14 ml-2 mr-2'>
            <Image source={icons.r} style={styles.icon}/>
            <Text style={styles.cost}>{item.cost}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ColumnView;

const styles = StyleSheet.create({
  Image: {
    height: vh(30),
    borderRadius:20,
  },
  icon:{
    marginTop:4,
    width: 20,
    height: 20,
  },
  cost:{
    color:TEXTCOLOR.primary,
    fontWeight:'bold',
    fontStyle:'italic',
    ...COMMONTEXT.secondary,
  }
});

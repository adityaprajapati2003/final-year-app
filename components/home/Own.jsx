import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { urlFor } from "../../sanity";
import { icons } from "../../constants";

const Own = ({ product }) => {
  return (
    <View className='m-5'>
      {/* This is the view that holds item to be selled */}
      <View>
        <View>
          <Text style={styles.Header}>{product.name}</Text>
          <Text style={styles.text}>{product.description}</Text>
        </View>
        <Image
          source={{ uri: urlFor(product.image).url() }}
          style={styles.GotImage}
        />
        <Text style={styles.text1}>Owned by: {product.manu}</Text>
        <View className="flex flex-row justify-between bg-gray-800 shadow-lg shadow-slate-100 p-3 rounded-2xl">
            <View className="flex flex-row mt-2">
                <Image source={icons.eth} style={styles.icon} />
                <Text style={styles.Header}>{product.nft}</Text>
            </View>
            <TouchableOpacity className='flex p-3 rounded-2xl mr-2 bg-gray-900'>
                <Text style={styles.bid}>Place Bid</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Own;

const styles = StyleSheet.create({
    bid:{
        fontSize:25,
        fontStyle:'normal',
        fontFamily:"Emedium",
        color:"aliceblue",
    },
  GotImage: {
    width: vw(90),
    height: vh(50),
    borderRadius: 20,
    alignSelf:'center',
  },
  Header: {
    color: "aliceblue",
    fontFamily: "Emedium",
    fontSize: 30,
    paddingBottom: 5,
  },
  text: {
    color: "aliceblue",
    fontFamily: "Emedium",
    fontSize: 18,
    minHeight:vh(3.5),
    marginBottom:10,
    marginTop:5,
  },
  text1: {
    color: "aliceblue",
    fontFamily: "Emedium",
    fontSize: 25,
    minHeight:vh(4.5),
    maxHeight:'auto',
    marginBottom:5,
    marginTop:10,
  },
  icon: {
    width: 35,
    height: 35,
  },
});

// This is only for ScrollViews for Iterating data of lists

import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { COLORS, icons, COMMONTEXT, TEXTCOLOR } from "../../constants";
import { urlFor } from "../../sanity";

const RowView = ({ Item, PageRef, Icon }) => {
  
  const takeMeTo = useNavigation();

  const NameSlice = (name) => {
    let doThis = name.substring(0, 25);
    return doThis;
  };

  return (
    <View style={styles.MainViewContainer} className='shadow-xl shadow-gray-950 bg-slate-300'>
      <TouchableOpacity onPress={() => takeMeTo.navigate(PageRef, { ...Item })} >
        <Image 
          source={{ uri: urlFor(Item.image).url() }}
          style={styles.MainImageContainer}
        />
        <View
          style={styles.AttributeContainer}
          className="flex flex-col backdrop-blur-md bg-gray-800/50"
        >
          <View className="flex flex-col" style={styles.SmallContainer}>
            <Text style={styles.Name}>{NameSlice(Item.name)}...</Text>
            <View className="flex flex-row">
              <Image style={styles.icon} className="mt-1" source={Icon} />
              <Text style={styles.cost}>{Item.cost}</Text>
            </View>
          </View>
          
          <View style={styles.CartBtn} className="backdrop-blur-md bg-gray-200/50">
            <TouchableOpacity onPress={() => takeMeTo.navigate(PageRef, { ...Item })}>
                <Image source={icons.right} style={styles.CartBtn.iconbtn}/>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MainViewContainer: {
    width: vw(80),
    height: vh(35),
    marginRight: vh(3),
    marginBottom: vh(2),
    display: "flex",
    borderRadius: 40,
  },
  MainImageContainer: {
    width: vw(80),
    height: vh(35),
    borderRadius: 40,
  },
  SmallContainer: {
    width: vw(50),
    height: vh(10),
  },
  AttributeContainer: {
    marginTop: vh(-10),
    borderRadius: 40,
    height: vh(8.5),
    padding: vw(1),
    marginLeft:vw(3),
    marginRight:vw(3),
    paddingLeft: vw(5),
  },
  Name: {
    paddingTop: vh(0.5),
    paddingBottom: vh(0.5),
    marginRight: vh(1),
    ...COMMONTEXT.secondary,
    color: TEXTCOLOR.primary,
  },
  cost: {
    fontSize: 20,
    color: TEXTCOLOR.primary,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  icon: {
    width: 20,
    height: 20,
  },
  CartBtn: {
    width: 55,
    height: 55,
    bottom: 0,
    left: vw(54),
    borderRadius: 25,
    marginTop: vh(-9.7),
    justifyContent: "center",
    alignItems: "center",
    iconbtn: {
      width: 40,
      height: 40,
    },
  },
});

export default RowView;

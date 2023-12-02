import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { COLORS, icons ,COMMONTEXT, TEXTCOLOR} from "../../constants";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const takeMeToSearch = useNavigation();

  return (
    // Whole Container
    <View style={styles.HeaderContainer}>
      <StatusBar style='dark' />
      <View style={styles.HeaderTemplate}>
        <Text style={styles.OriginalText}>
          Kajri App
        </Text>
        <TouchableOpacity
          onPress={() => {
            takeMeToSearch.navigate("Search");
          }}
          style={styles.SearchView}
        >
          <Image
            source={icons.loupe}
            style={styles.resizeImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  OriginalText: {
    paddingLeft:vw(5),
    paddingTop:vh(0.5),
    color:TEXTCOLOR.secondary,
    fontFamily:'Brusher',
    fontSize:40,
  },
  resizeImage: {
    width: 35,
    height: 35,
  },
  HeaderTemplate: {
    marginLeft: vw(5),
    marginRight: vw(5),
    flexDirection: "row",
    minHeight: vh(6),
    justifyContent: "space-between",
  },
  SearchView:{
    padding:8,
  }
});

export default Header;

import { StyleSheet, Text, View ,Image} from "react-native";
import React from "react";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { urlFor } from "../../sanity";
import { icons } from "../../constants";
import CheckMe from "../cart/CheckMe";

const Buy = ({ product }) => {

  return (
    <View>
      {/* This is the view that holds item to be selled */}
      <View className="flex flex-row bg-gray-800 shadow-lg shadow-slate-200 rounded-2xl m-5 p-3">
        <Image
          source={{ uri: urlFor(product.image).url() }}
          style={styles.GotImage}
        />
        <View className="pl-3">
          <Text style={styles.Header}>{product.name}</Text>
          <Text style={styles.text}>{product.description}</Text>
          <Text style={styles.text}>Owned by: {product.manu}</Text>
          {product.offers ? (
            <Text style={styles.text}>Offers: {product.offers}</Text>
          ) : (
            ""
          )}
          <View className="flex flex-row">
            <Text style={styles.costText}>Cost : </Text>
            <Image style={styles.icon} className="mt-1" source={icons.r} />
            <Text style={styles.cost}>{product.cost}</Text>
          </View>
        </View>
      </View>

      {/* The payment component is here  */}
      <View className="flex flex-col bg-gray-800 shadow-lg shadow-slate-200 rounded-2xl m-5 mt-0 p-3">
        <Text style={styles.Static}>Payment modes choose one option</Text>
        {/* this is imported */}
        <CheckMe />
      </View>
    </View>
  );
};

export default Buy;

const styles = StyleSheet.create({
  GotImage: {
    width: vh(15),
    height: vw(35),
    borderRadius: 20,
  },
  Header: {
    color: "aliceblue",
    fontFamily: "Emedium",
    fontSize: 24,
    paddingBottom: 5,
  },
  Static: {
    color: "aliceblue",
    fontFamily: "Emedium",
    fontSize: 25,
    paddingBottom: 5,
    height: vh(5),
  },
  text: {
    color: "aliceblue",
    fontFamily: "Emedium",
    fontSize: 18,
    width: vw(55),
    paddingBottom: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: vh(1),
  },
  cost: {
    fontSize: 25,
    color: "aliceblue",
    fontStyle: "italic",
  },
  costText: {
    fontSize: 20,
    color: "aliceblue",
    fontStyle: "italic",
  },
});

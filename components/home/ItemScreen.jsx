import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import AttributeHolders from "./AttributeHolders";
import { useDispatch } from "react-redux";
import Client, { urlFor } from "../../sanity";
import ColumnViewHome from "./ColumnViewHome";
import { setPage } from "../../toolkit/reducers/UserAuth";

const ItemScreen = () => {
  // Storing the screen info in redux
  const dispatch = useDispatch();

  // Navigation and Parameters passed
  const takeMeTo = useNavigation();

  const { params } = useRoute();
  let product = params;

  // Fetching data from sanity
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  // const getData = async () => {
  //   setLoading(true);

  //   await Client.fetch(`*[ _type == "saree" ]`).then((res) => {
  //     setData(res);
  //   });

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 100);
  // };
  // getData();

  const setNavigationStateBuy = () => {
    dispatch(setPage({ page: "buy" }));
    takeMeTo.navigate("cart", { ...product });
  };

  const setNavigationStateOwn = () => {
    dispatch(setPage({ page: "own" }));
    takeMeTo.navigate("cart", { ...product });
  };

  return (
    <SafeAreaView style={styles.ItemScreenMainContainer}>
      {loading ? (
        ""
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          contentContainerStyle={{
            paddingTop: vh(1),
            marginBottom: vh(1),
          }}
        >
          <View style={styles.MainItemDisplay}>
            <Text style={styles.ItemName}>{product.name}</Text>
            <Text style={styles.description}>{product.description}.</Text>
            <Text style={styles.ownerName}>Owned by : {product.manu}</Text>
            <Image
              source={{ uri: urlFor(product.image).url() }}
              style={styles.MainItemImage}
            />
            <View className="flex flex-row" style={styles.AttributeProvider}>
              <AttributeHolders Icon={icons.eth} attribute={product.nft} />
              <AttributeHolders Icon={icons.show} attribute={product.views} />
              <AttributeHolders Icon={icons.star} attribute={product.ratings} />
            </View>
          </View>

          {product.offers ? (
            <Text style={styles.Offer}>Offers: {product.offers}</Text>
          ) : (
            ""
          )}

          <View className="flex flex-row pt-4">
            <Text style={styles.Offer}>Cost : </Text>
            <Image style={styles.icon} className="mt-1" source={icons.r} />
            <Text style={styles.cost}>{product.cost}</Text>
          </View>

          <View
            className={`flex flex-row p-10 pt-5 ${
              product.nft ? `justify-between` : `justify-center`
            }`}
          >
            <TouchableOpacity
              className="bg-gray-800 shadow-lg shadow-slate-200 rounded-2xl"
              onPress={setNavigationStateBuy}
            >
              <Text style={styles.btn}>Buy</Text>
            </TouchableOpacity>

            {product.nft ? (
              <TouchableOpacity
                className="bg-gray-800 shadow-lg shadow-slate-200 rounded-2xl"
                onPress={setNavigationStateOwn}
              >
                <Text style={styles.btn}>Own it</Text>
              </TouchableOpacity>
            ) : (
              ""
            )}
          </View>
          {/* <ColumnViewHome Data={data} /> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainItemDisplay: {
    marginLeft: vw(5),
    marginRight: vw(5),
  },
  ItemName: {
    fontSize: 35,
    height: vh(6),
    fontFamily: "Emedium",
    color: "aliceblue",
  },
  description: {
    fontSize: 20,
    fontFamily: "Emedium",
    color: "aliceblue",
    minHeight: vh(4),
  },
  ownerName: {
    fontSize: 18,
    fontFamily: "Emedium",
    color: "aliceblue",
    minHeight: vh(4),
  },
  MainItemImage: {
    width: vw(90),
    height: vh(50),
    borderRadius: 30,
  },
  AttributeProvider: {
    width: vw(80),
    marginLeft: vw(2),
    marginRight: vw(2),
  },
  icon: {
    width: 35,
    height: 35,
    marginTop: vh(1),
  },
  cost: {
    fontSize: 40,
    color: "aliceblue",
    fontStyle: "italic",
  },
  Offer: {
    paddingTop: vh(2),
    flexWrap: "nowrap",
    color: "aliceblue",
    paddingLeft: vw(5),
    fontSize: 18,
    fontFamily: "Emedium",
    minHeight: vh(5),
  },
  btn: {
    color: "aliceblue",
    fontFamily: "Emedium",
    fontSize: 28,
    height: vh(7),
    width: vw(35),
    textAlign: "center",
    paddingTop: vh(1),
  },
});

export default ItemScreen;

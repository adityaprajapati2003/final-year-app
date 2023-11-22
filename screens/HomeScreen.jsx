import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/home/Header";
import ColumnViewHome from "../components/home/ColumnViewHome";
import RowViewHome from "../components/home/RowViewHome";
import Client from "../sanity";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  
  const getData =async()=>{
    await Client.fetch(`*[ _type == "saree" ]`).then((res) => {
      setData(res);
    });
  }
  getData();

  const ArrayReducer = data.slice(4, 12);
  const RowArrayReducer = data.slice(0, 5);

  return (
    <SafeAreaView>
      <ScrollView>
        <Header/>
        <RowViewHome Data={RowArrayReducer} />
        <ColumnViewHome Data={ArrayReducer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

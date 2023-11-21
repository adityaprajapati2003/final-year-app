import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Buy from "../components/home/Buy";
import { useSelector } from "react-redux";
import Own from "../components/home/Own";

const Cart = () => {

  // Getting the parameters from itemscreen
  const { params } = useRoute();
  let product = params;

  const getPageState = useSelector((state)=>state.user.page);


  return (
      <SafeAreaView style={styles.MainContainer}>
        <KeyboardAvoidingView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true}
            contentContainerStyle={{
              marginBottom: vh(5),
            }}
          >
            { getPageState === 'buy' ? <Buy product={product}/> : <Own product={product}/>}
            
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    height: vh(105),
  },
});

export default Cart;

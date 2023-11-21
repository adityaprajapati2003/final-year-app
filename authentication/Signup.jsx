import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Registration from "./forms/Registration";
import { COMMONTEXT, TEXTCOLOR } from "../constants";
import { SimpleAnimation } from "react-native-simple-animations";

const Signup = () => {
  const takeMeTo = useNavigation();

  return (
    <KeyboardAvoidingView>
      {/* this help to avoid Keyboard errors */}
      <SafeAreaView style={styles.MainContainer}>
        <SimpleAnimation delay={500} duration={2000} fade staticType='bounce'>
          <Text style={styles.hello}>Hey !! Newors</Text>
          {/* Registration page is imported */}
          <Registration />
          <View>
            <TouchableOpacity onPress={() => takeMeTo.navigate("signin")}>
              <Text style={styles.TextNav}>Already have account ? Login</Text>
            </TouchableOpacity>
          </View>
        </SimpleAnimation>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    height: vh(105),
    paddingLeft: vw(10),
    paddingRight: vw(10),
    paddingTop: vh(10),
    alignItems: "center",
  },
  TextNav: {
    color: TEXTCOLOR.secondary,
    alignSelf:"center",
    marginTop: vh(3),
    height: vh(4),
    ...COMMONTEXT.primary,
  },
  hello: {
    height: vh(5),
    alignSelf:'center',
    color: TEXTCOLOR.secondary,
    ...COMMONTEXT.fourth,
  },
});

export default Signup;

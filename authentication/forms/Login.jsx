import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { loginSchema } from "../schema/loginSchema";
import { auth } from "../firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, COMMONTEXT, TEXTCOLOR } from "../../constants";
import { useDispatch } from "react-redux";
import { login } from "../../toolkit/reducers/UserAuth";

const Login = () => {

  const dispatch = useDispatch();

  //Event for handling login
  const HandleLogin = async (values) => {
    try {

      const { email, password } = values;

      await signInWithEmailAndPassword(auth, email, password);
      
      //Dispatching values
      dispatch(login({email}));
    
      // saving the email address
      const user = {email};
      const userData = JSON.stringify(user);
      await AsyncStorage.setItem("user",userData);

      
    }catch(e){
      console.log("new", e);
    }
  };

  return (
    <Formik
      initialValues={{
        email:'',
        password:'',
      }}
      validationSchema={loginSchema}
      onSubmit={HandleLogin}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <View >
          <TextInput
            values={values.email}
            onChangeText={handleChange("email")}
            placeholder="Email"
            placeholderTextColor="gray"
            style={styles.TextInput}
          />
          
          {touched.email && errors.email ? (
            <Text style={styles.ErrorText}>{errors.password}</Text>
          ) : (
            ""
          )}

          <TextInput
            values={values.password}
            onChangeText={handleChange("password")}
            placeholder="Password"
            placeholderTextColor="gray"
            style={styles.TextInput}
          />
          
          {touched.password && errors.password ? (
            <Text style={styles.ErrorText}>{errors.password}</Text>
          ) : (
            ""
          )}
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.Login} className="shadow-lg shadow-gray-950">Login</Text>
          </TouchableOpacity>
        </View>
        
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  TextInput: {
    width: vw(80),
    height: vh(7),
    marginTop: vh(3),
    borderRadius: 25,
    borderWidth:1,
    borderColor:TEXTCOLOR.secondary,
    paddingLeft: vw(5),
    paddingRight: vw(5),
    ...COMMONTEXT.tertiary,
  },
  Login: {
    width: vw(40),
    marginTop: vh(5),
    alignSelf: "center",
    textAlign: "center",
    backgroundColor:COLORS.motoblue,
    color:TEXTCOLOR.primary,
    padding:10,
    borderRadius: 50,
    ...COMMONTEXT.fourth,
  },
  ErrorText: {
    ...COMMONTEXT.primary,
    paddingLeft: vw(5),
    height: vh(3),
    marginTop: vh(1),
  },
});

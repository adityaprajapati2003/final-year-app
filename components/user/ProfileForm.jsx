import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { StyleSheet, Text, View ,TouchableOpacity,Image} from "react-native";
import React, { useState } from "react";
import TextField from "../cart/TextField";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import {auth, firestore} from "../../authentication/firebase/firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { icons } from "../../constants";

const ProfileForm = () => {
  
  // user Details
  const [address, setAddress] = useState({
    StreetAddress: useSelector((state)=>state.user.street_address),
    Apartment: useSelector((state)=>state.user.apartment),
    City: useSelector((state)=>state.user.city),
    State: useSelector((state)=>state.user.state),
    ZipCode: useSelector((state)=>state.user.zipcode),
  });

  const [contact, setContact] = useState({
    MobileNo: useSelector((state)=>state.user.mobileno),
  });

  const ResetStates =()=>{
    setAddress({
      StreetAddress:null,
      Apartment:null,
      City:null,
      State:null,
      ZipCode:null,
    })
    setContact({
      MobileNo:null,
    })
  }

  const getUserEmail = useSelector((state) => state.user.email);

  const saveProfileRecords = async(address,contact,email)=>{
    try{
      let docs = await setDoc(doc(collection(firestore,"users_collections_data"),email),{
        address,
        contact,
      });
      console.log("good going keep going");
    }catch(e){
      console.log("Not fine bro",e);
    }
  }

  const checkUserAndSetProfileData = async(email) => {
    const getUserByEmail = await fetchSignInMethodsForEmail(auth,email);
    if(getUserByEmail){
      await saveProfileRecords(address,contact,getUserEmail);
    }
  }
  return (
    <View className="p-5">
      <View className='flex flex-row justify-between pb-5'>
        <Text style={styles.header}>Address</Text>
        <TouchableOpacity onPress={()=>ResetStates()}>
            <Image source={icons.reset} style={styles.reset}/>
        </TouchableOpacity>
      </View>
      <View>
        <TextField
          label="Street Address"
          value={address.StreetAddress}
          onChangeText={(text) =>setAddress({ ...address, StreetAddress: text })}
        />
        <TextField
          label="Apartment, flatno"
          value={address.Apartment}
          onChangeText={(text) => setAddress({ ...address, Apartment: text })}
        />
        <TextField
          label="State"
          value={address.State}
          onChangeText={(text) => setAddress({ ...address, State: text })}
        />
        <TextField
          label="City"
          value={address.City}
          onChangeText={(text) => setAddress({ ...address, City: text })}
        />
        <TextField
          label="ZipCode"
          value={address.ZipCode}
          onChangeText={(text) => setAddress({ ...address, ZipCode: text })}
        />
      </View>
      <Text style={styles.header}>Contact details</Text>
      <View>
        <TextField
          label="Mobile Number"
          value={contact.MobileNo}
          onChangeText={(text) => setContact({ ...contact, MobileNo: text })}
        />
      </View>
      <TouchableOpacity className='bg-gradient-to-r from-green-400 to-blue-500' onPress={()=>checkUserAndSetProfileData(getUserEmail)}>
          <Text style={styles.text}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  text: {
    color: "aliceblue",
    fontSize: 25,
    fontFamily: "Emedium",
    height: vh(4),
    marginTop: vh(2),
    marginBottom: vh(2),
    textAlign: "center",
  },
  header: {
    color: "aliceblue",
    fontSize: 22,
    fontFamily: "Emedium",
    height: vh(4),
    marginBottom: vh(1),
    paddingTop:vh(1),
  },
  txt: {
    color: "aliceblue",
    fontSize: 20,
    fontFamily: "Emedium",
    height: vh(3.5),
    width: vw(40),
  },
  txtBtn: {
    color: "aliceblue",
    fontSize: 20,
    fontFamily: "Emedium",
    height: vh(3.5),
    textAlign: "center",
  },
  reset:{
    width:40,
    height:40,
  }
});

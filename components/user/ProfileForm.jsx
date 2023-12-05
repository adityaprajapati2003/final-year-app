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
  updateDoc,
} from "firebase/firestore";
import { firestore} from "../../authentication/firebase/firebase";
import { COLORS, TEXTCOLOR, icons } from "../../constants";
import { COMMONTEXT } from "../../constants";

const ProfileForm = () => {

  const getUserEmail = useSelector((state) => state.user.email);
  
  // user Details
  const [address, setAddress] = useState({
    StreetAddress: useSelector((state)=>state.user.street_address) ,
    Apartment: useSelector((state)=>state.user.apartment),
    City: useSelector((state)=>state.user.city) ,
    State: useSelector((state)=>state.user.State) ,
    ZipCode: useSelector((state)=>state.user.zipcode) ,
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

  const saveProfileRecords = async(address,contact,email)=>{
    if(address.StreetAddress || contact.MobileNo){
      try{
        await updateDoc(doc(collection(firestore,'users_collections_data'),email),{
          address,contact,
        });
      }catch(e){
        console.log('Profileform error while updating',e);
      }

    }else{
      try{
        await setDoc(doc(collection(firestore,'users_collections_data'),email),{
          address,contact
        });
      }catch(e){
        console.log('Profileform error while setting',e);
      }
    }
  }

  return (
    <View className="p-5">
      <View className='flex flex-row justify-between pb-5'>
        <Text style={styles.header}>Address</Text>
        <TouchableOpacity style={styles.back} className="shadow-xl shadow-black" onPress={()=>ResetStates()}>
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
      <TouchableOpacity style={styles.savebtn} className="shadow-xl shadow-black" onLongPress={saveProfileRecords(address,contact,getUserEmail)}>
          <Text style={styles.text}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileForm;


const styles = StyleSheet.create({
  savebtn:{
    padding:10,
    backgroundColor:COLORS.motoblue,
    width:vw(50),
    alignSelf:'center',
    borderRadius:30,
  },
  text: {
    height: vh(4),
    textAlign: "center",
    color:TEXTCOLOR.primary,
    ...COMMONTEXT.fourth,
  },
  header: {
    height: vh(4),
    marginBottom: vh(1),
    paddingTop:vh(1),
    ...COMMONTEXT.tertiary,
  },
  reset:{
    width:40,
    height:40,
  },
  back:{
    padding:2,
    backgroundColor:COLORS.motoblue,
    borderRadius:50,
  }
});

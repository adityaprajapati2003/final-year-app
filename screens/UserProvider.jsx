import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import { COLORS, icons, COMMONTEXT } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Model from "react-native-modal";
import ImageForm from "../components/user/ImageForm";
import ProfileForm from "../components/user/ProfileForm";
import { KeyboardAvoidingView } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../authentication/firebase/firebase";
import { address, userimage, contact } from "../toolkit/reducers/UserAuth";

const UserProvider = () => {
  //View Bottom sheet
  const [isVisible, setAsVisible] = useState(false);

  const [user_data, setUser_data] = useState({
    image: null,
    street_address: "",
    apartment: "",
    city: "",
    state: "",
    zipcode: "",
    mobileno: null,
    thrifts: 0,
    orders: 0,
    owned: 0,
    email: "",
  });

  // function to retrieve user data based on email
  const getUserEmail = useSelector((state) => state.user.email);

  const dispatch_values = useDispatch();

  useEffect(() => {
    const FetchUserInfo = async (email) => {
      // varibles declared at global scope
      try {
        const fetch_image = await getDoc(
          doc(collection(firestore, "users_collections"), email)
        ); /* Fetching Image url */
        const fetch_profile = await getDoc(
          doc(collection(firestore, "users_collections_data"), email)
        ); /* Fetching User Profile Infos */

        /* Checks For demanded values are available */
        {
          fetch_image
            ? console.log("Image is fetched")
            : console.log("Not fetched yet");
        }
        {
          fetch_profile
            ? console.log("Values is fetched")
            : console.log("Values not fetched");
        }

        if (fetch_image && fetch_profile) {
          dispatch_values(userimage({ image: fetch_image.data().uri }));

          dispatch_values(
            address({
              street_address: fetch_profile.data().address.StreetAddress,
              apartment: fetch_profile.data().address.Apartment,
              city: fetch_profile.data().address.City,
              State: fetch_profile.data().address.State,
              zipcode: fetch_profile.data().address.ZipCode,
            })
          );

          dispatch_values(
            contact({
              mobileno: fetch_profile.data().contact.MoblieNo,
              email: email,
            })
          );

          setUser_data({
            image: fetch_image.data().uri,
            street_address: fetch_profile.data().address.StreetAddress,
            apartment: fetch_profile.data().address.Apartment,
            city: fetch_profile.data().address.City,
            state: fetch_profile.data().address.State,
            zipcode: fetch_profile.data().address.ZipCode,
            mobileno: fetch_profile.data().contact.MoblieNo,
            email: email,
            thrifts: 0,
            orders: 0,
            owned: 0,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    FetchUserInfo(getUserEmail);
  }, [getUserEmail, dispatch_values]);

  // user status
  const [isDown, setAsDown] = useState(false);

  // user info
  const [isUp, setAsUp] = useState(false);

  return (
    <KeyboardAvoidingView>
      <SafeAreaView style={{ minHeight: vh(105), maxHeight: "auto" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: vh(10),
          }}
        >
          {/* upload image here */}
          <View>
            <View style={styles.imageContainer}>
              {user_data.image ? (
                <Image source={{ uri: user_data.image }} style={styles.image} />
              ) : (
                <Image source={icons.man} style={styles.image} />
              )}
            </View>
          </View>

          {/* User Activity here */}

          <View
            style={styles.AttributeContainer}
            className="shadow-xl shadow-black"
          >
            <TouchableOpacity
              style={styles.Editbtn}
              onPress={() => setAsVisible(!isVisible)}
            >
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>

            <Text style={styles.email}>{getUserEmail}</Text>
          </View>

          {/* crypto wallet */}
          <View style={styles.cryptoWallet} className="shadow-xl shadow-black">
            <TouchableOpacity className="flex flex-row justify-between">
              <View>
                <Text style={styles.header} className="pt-1">
                  My Crypto Wallet
                </Text>
                <Text style={styles.text}>Balance : $300</Text>
              </View>
              <Image source={icons.arrow} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* user activity status */}
          <View
            style={styles.activityStatus}
            className="shadow-xl shadow-black"
          >
            <View className="flex flex-row justify-between">
              <Text style={styles.header} className="pt-1 ">
                My Orders, NFT and Thrifts
              </Text>
              <TouchableOpacity onPress={() => setAsDown(!isDown)}>
                <Image
                  source={isDown ? icons.darrow : icons.uparrow}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {!isDown ? (
              <View className="pt-5 pl-5" style={styles.Borderplz}>
                <Text style={styles.text}>
                  Orders Made : {user_data.orders}
                </Text>
                <Text style={styles.text}>NFT Owned : {user_data.owned}</Text>
                <Text style={styles.text}>
                  Thrifts Made : {user_data.thrifts}
                </Text>
              </View>
            ) : (
              ""
            )}
          </View>

          {/* User Details here */}
          <View style={styles.userDetail} className="shadow-xl shadow-black">
            <View className="flex flex-row justify-between">
              <Text style={styles.header}>My Personal Info</Text>
              <TouchableOpacity onPress={() => setAsUp(!isUp)}>
                <Image source={isUp ? icons.darrow : icons.uparrow} style={styles.icon} />
              </TouchableOpacity>
            </View>
            {
              !isUp ?
                <View>
                  <View style={styles.Borderplz}>
                    <Text style={styles.header}>Address</Text>
                    <View>
                      <Text style={styles.text} className="pl-5">{user_data.street_address},{user_data.apartment},{user_data.state}</Text>
                      <Text style={styles.text} className="pl-5">{user_data.city} - {user_data.zipcode}</Text>
                    </View>
                  </View>
                  <View style={styles.Borderplz}>
                    <Text style={styles.header}>Contact</Text>
                    <View>
                      <Text style={styles.text} className="pl-5">Mobile No : {user_data.mobileno}</Text>
                      <Text style={styles.text} className="pl-5">Email Address : {user_data.email}</Text>
                    </View>
                  </View>
                </View> 
                : ""
            }
          </View>

          {/* user's order status */}
          <View style={styles.userDetail} className="shadow-xl shadow-black">
            <TouchableOpacity>
              <Text style={styles.header}>My Order's Status</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom sheets */}
          <Model
            isVisible={isVisible}
            onBackdropPress={() => setAsVisible(!isVisible)}
            style={styles.popup}
            propagateSwipe
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <ImageForm />
              <ProfileForm />
            </ScrollView>
          </Model>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Editbtn: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginEnd: 10,
  },
  editIcon: {
    width: 35,
    height: 35,
  },
  Borderplz:{
    borderWidth:1,
    borderColor:COLORS.motoblue,
    borderRadius:25,
    padding:10,
    marginTop:10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  text: {
    minHeight: vh(4),
    ...COMMONTEXT.secondary,
  },
  header:{
    minHeight: vh(4),
    ...COMMONTEXT.semisecondary,
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: vh(5),
    position: "absolute",
    zIndex: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  AttributeContainer: {
    marginTop: vh(15),
    width: vw(90),
    paddingBottom: vh(2),
    marginBottom: vh(2),
    marginRight: vw(5),
    marginLeft: vw(5),
    borderRadius: 25,
    backgroundColor: COLORS.gradientGray,
  },
  cryptoWallet: {
    padding: vh(2),
    marginBottom: vh(2),
    marginRight: vw(5),
    marginLeft: vw(5),
    borderRadius: 25,
    backgroundColor: COLORS.gradientGray,
  },
  email: {
    ...COMMONTEXT.tertiary,
    paddingTop: 30,
    textAlign: "center",
    height: vh(8),
  },
  activityStatus: {
    padding: vh(2),
    marginBottom: vh(2),
    marginRight: vw(5),
    marginLeft: vw(5),
    borderRadius: 25,
    backgroundColor: COLORS.gradientGray,
  },
  userDetail: {
    padding: vh(2),
    marginBottom: vh(2),
    marginRight: vw(5),
    marginLeft: vw(5),
    borderRadius: 25,
    backgroundColor: COLORS.gradientGray,
  },
  popup:{
    marginTop:vh(20),
    marginLeft:vw(5),
    marginRight:vw(5),
    backgroundColor: COLORS.gradientGray,
    borderRadius:30,
  }
});

const MemoizedUserProvider = memo(UserProvider);

export default MemoizedUserProvider;

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import {
  auth,
  storage,
  firestore,
} from "../../authentication/firebase/firebase";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";
import { COLORS ,COMMONTEXT} from "../../constants";

const ImageForm = () => {
  const [imagefile, setImageFile] = useState(
    useSelector((state) => state.user.image)
  );

  // Image picker function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageFile(result.assets[0].uri);
    }
  };

  const imageName = (value) => {
    const getText = new URL(value);
    let urlObj = getText.toString();
    const getUrlText = urlObj.substring(0, 30);
    return getUrlText;
  };

  // Storing the image in firestore
  /*check if user exists or not*/

  const getUserEmail = useSelector((state) => state.user.email);

  async function saveRecord(uri, email) {
    try {
      let docRef = await setDoc(
        doc(collection(firestore, "users_collections"), email),
        {
          uri,
        }
      );
      console.log("good going keep going");
    } catch (e) {
      console.log("Not fine bro", e);
    }
  }

  const CheckUserExistThenUploadImage = async (uri, email) => {
    const res = await fetch(uri);
    const blob = await res.blob(); /* blob stands binary large objects*/

    const getUserByEmail = await fetchSignInMethodsForEmail(auth, email);
    const filename = new Date().getDate() + ".jpg";

    if (getUserByEmail) {
      const userStoragePath = `UserImage/${email}/${filename}`;
      const storageRef = ref(storage, userStoragePath);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on("state_changed", () =>
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          await saveRecord(downloadUrl, email);
        })
      );
    }
  };

  {
    imagefile ? CheckUserExistThenUploadImage(imagefile, getUserEmail) : "";
  }

  return (
    <View className="p-5 pb-0">
      <Text style={styles.text}>Profile details</Text>
      <Text style={styles.header}>Profile Image</Text>
      <View className="flex flex-row justify-between">
        <View className="border-dashed border-2 border-slate-900 p-3">
          <Text style={styles.txt}>
            {imagefile ? imageName(imagefile) : ".png, .jpg, .jpeg, .webp"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={pickImage}
          className=" p-3"
          style={styles.upbox}
        >
          <Text style={styles.txtBtn}>
            {imagefile ? "Update Image" : "Upload Image"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageForm;

const styles = StyleSheet.create({
  text: {
    minHeight: vh(4),
    marginBottom: vh(2),
    textAlign: "center",
    ...COMMONTEXT.secondary,
  },
  header: {
    color: "aliceblue",
    fontSize: 22,
    fontFamily: "Emedium",
    height: vh(4),
    marginBottom: vh(1),
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
  upbox: {
    width: vw(30),
    backgroundColor:COLORS.motoblue,
  },
});

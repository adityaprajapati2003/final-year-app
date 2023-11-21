import React from "react"
import { View , StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderForSearch from "../components/search/HeaderForSearch";
import { COLORS } from "../constants";
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';

const Search=()=>{
    return(
    <View style={styles.MainContainerSearch}>
       <SafeAreaView>
            <HeaderForSearch/>
       </SafeAreaView>
    </View>
    )
}

const styles= StyleSheet.create({
    MainContainerSearch:{
        backgroundColor:COLORS.ColumbiaBlue,
        height:vh(100),
    }
})
export default Search;
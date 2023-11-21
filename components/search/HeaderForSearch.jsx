import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import { icons } from '../../constants';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';

const HeaderForSearch = () => {

    return (
        // Whole Container
        <View style={styles.HeaderContainer}> 
            <StatusBar style='auto'/>
            
            <View style={styles.HeaderContainer.HeaderTemplateNext} className=" rounded-3xl backdrop-blur-md bg-white/50">

            <TextInput placeholder="Explore it !" style={styles.HeaderContainer.HeaderTemplateNext.OriginalText} />

                <TouchableOpacity onPress={()=>{}}>
                    <Image source={icons.loupe} style={styles.HeaderContainer.HeaderTemplateNext.resizeImage}/>
                </TouchableOpacity>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    HeaderContainer:{
        HeaderTemplateNext:{
            marginTop:vh(1),
            marginLeft: vw(3.5),
            marginRight:vw(3.5),
            flexDirection:'row',
            height:vh(6),
            alignItems:'center',
            OriginalText:{
                width:vw(80),
                marginLeft:vw(3),
                fontSize: 25,
                fontFamily:'Ebold',
                color:"aliceblue"
            },
            resizeImage:{
                width:35,
                height:35,
                marginRight:vw(2), 
            }
        }
    }
})

export default HeaderForSearch;

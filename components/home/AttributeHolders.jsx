import React, { useState } from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";

const AttributeHolders = ({Icon,attribute}) => {
    
    const [getAttributeValue,setAttributeValue] = useState(attribute);
    
    if (!getAttributeValue){
        setAttributeValue("non nft");
    }

    return (
        <View className='flex flex-row bg-gray-500/80'  style={styles.Holder}>
            <Image source={Icon} style={styles.IconHolder}/>
            <Text style={styles.value}>{getAttributeValue}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    IconHolder:{
        width:20,
        height:20,
    },
    Holder:{
        padding:vh(1),
        paddingRight:vh(2),
        marginTop:vh(-6.5),
        height:vh(4.2),
        marginLeft:vw(4),
        borderRadius:20,
    },
    value:{
        color:'aliceblue',
        fontSize:15,
        marginLeft:5
    }
})

export default AttributeHolders;

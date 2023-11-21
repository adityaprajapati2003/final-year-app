import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";
import { SimpleGrid } from 'react-native-super-grid';
import { icons } from '../../constants';
import ColumnView from '../home/ColumnView';

// This is reserved for Search or Explore Screen

const ColumnViewSearch = ({Data}) => {
    
    return (
        <View style={styles.MainContainer}>
            <View>
                <Text style={styles.HeaderText}>View are Products</Text>
            </View>
            <SimpleGrid data={Data} itemDimension={180} renderItem={({item})=>(<ColumnView Item={item} Icon={icons.r} PageRef={'ItemScreen'}/>)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    HeaderText:{
        margin:vh(1),
        marginRight:vh(3),
        fontFamily:'Ebold',
        fontSize:vh(2),
        textAlign:'right',
        color:'aliceblue',
    },
    MainContainer:{
        width:vw(100),
        paddingBottom:vh(8),
    }
})

export default ColumnViewSearch;

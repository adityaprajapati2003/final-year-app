import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { SimpleGrid } from 'react-native-super-grid';
import MasonryList from "@react-native-seoul/masonry-list";
import ColumnView from "../home/ColumnView";
import { COMMONTEXT, icons } from "../../constants";

const RenderColumns = ({ Data }) => {
    
  return (
    <View style={styles.MainContainer}>
     
      {/* <SimpleGrid data={Data} itemDimension={180} renderItem={({item,index})=>(<ColumnView item={item} index={index}/>)}/> */}
      <MasonryList
        data={Data}
        keyExtractor={(item)=>item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:25 , marginBottom:vh(5)}}
        renderItem={({item,i})=>(<ColumnView item={item} index={i}/>)}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderText: {
    marginLeft: vh(4),
    ...COMMONTEXT.secondary,
  }, 
  MainContainer: {
    marginBottom:vh(2),
  },
  image:{
    height:vh(20),
    width:vw(35),
  }
});

export default RenderColumns;

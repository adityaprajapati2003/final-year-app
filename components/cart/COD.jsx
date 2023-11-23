import { View, StyleSheet} from 'react-native'
import React from 'react'
import { Box, Select } from 'native-base'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen"

const COD = () => {
  return (
    <View className="mb-3">
      <Box>
        <Select 
          accessibilityLabel='Choose Address' 
          placeholder='Choose Address' 
          style={styles.Dropdown} 
          placeholderTextColor={'aliceblue'}
        >
        </Select>
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  Dropdown:{
    fontFamily:'Emedium',
    fontSize:20,
  },
  header:{
    fontSize:18,
    fontFamily:'Emedium',
    color:"aliceblue",
    height:vh(3),
    paddingTop:2
  }
})

export default COD
import { View, StyleSheet} from 'react-native'
import React,{useState} from 'react'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen"
import TextField from './TextField'

const Card = () => {

  const [name,setName] = useState('');
  const [cardNumber,setCardNumber] = useState('');
  const [expiration,setExpiration] = useState('');
  const [cvv,setCVV] = useState('');

  return (
    <View>
        <View>
          <TextField
            style = {styles.TextField}
            label = "Card Holder's Name"
            value = {name}
            onChangeText = {(text)=>setName(text)}
          />
          <TextField
            style = {styles.TextField}
            label = "Card Number"
            value = {cardNumber}
            onChangeText = {(text)=>setCardNumber(text)}
          />
            <TextField
              style = {styles.field}
              label = "Expiry Data"
              value = {expiration}
              onChangeText = {(text)=>setExpiration(text)}
            />
            <TextField
              style = {styles.field}
              label = "CVV"
              value = {cvv}
              onChangeText = {(text)=>setCVV(text)}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        fontSize:18,
        fontFamily:'Emedium',
        color:"aliceblue",
        height:vh(3),
        paddingTop:2,
    },
    TextField: {
      flex: 1,
    },
})
export default Card
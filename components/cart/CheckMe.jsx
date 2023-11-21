import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";
import { Checkbox } from 'native-base';
import COD from './COD';
import Card from './Card';
import { COMMONTEXT } from '../../constants';

const CheckMe = () => {

    const [box1,setbox1] = useState(false);
    const [box2,setbox2] = useState(false);

    //Event Handler For checkboxes
    const handleCODChange =()=>{ setbox1(!box1); }
    const handleCardChange =()=>{ setbox2(!box2); }

  return (
    <View>
        <View style={styles.hey}>
            <Checkbox isDisabled={box2} onChange={handleCODChange} colorScheme={'amber'}>
                <Text style={styles.text}>Cash on Delivery</Text>
            </Checkbox>
        </View>
            {box1 ? <COD/>:""}
        <View style={styles.hey}>
            <Checkbox isDisabled={box1} onChange={handleCardChange} colorScheme={'amber'}>
                <Text style={styles.text}>Debit or Credit Card</Text>
            </Checkbox>
        </View>
            {box2 ? <Card/>:""}
    </View>
  )
}

export default CheckMe

const styles = StyleSheet.create({
    text:{
        ...COMMONTEXT.primary,
        width:vw(55),
        minHeight:vh(3),
        maxHeight:'auto',
    },
    hey:{
        marginBottom:vh(1.5),
    }
})
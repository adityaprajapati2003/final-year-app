import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, TEXTCOLOR, image } from '../constants';
import { COMMONTEXT } from '../constants';
import { useSelector } from 'react-redux';
import { urlFor } from '../sanity';
import * as Crypto from 'expo-crypto';
import { Checkbox } from 'native-base';
import RazorpayCheckout from 'react-native-razorpay';

const Cart = () => {

  // navigate to home page
  const navigate = useNavigation();

  // Importing params from Itemscreen page
  const {params} = useRoute();
  let object = params;

  // fetch page state
  const activepage = useSelector((state)=>state.user.page);
  console.log(activepage);
  
  // state for payment + calculate gst also
  const GST = 18;

  if(object){
      let amount = parseInt(object.cost);
      var GSTAMOUNT = amount * GST / 100;
      var TOTAL_AMOUNT = amount + GSTAMOUNT;
  }
  const uuid = Crypto.randomUUID();

  // fetch user address
  const user_address = useSelector((state)=>state.user.street_address);
  const email = useSelector((state)=>state.user.email);

  // handle payment 
  const handlePayment =()=>{
    const options ={
      key: 'rzp_test_agN5mjpFgt4knN',
      amount:10, // Amount in paisa
      name: 'Kajri NFT marketPlace',
      description:'aditya',
      image: '', // optional
      prefill: {
        email: 'adityakachannel@gmail.com',
        contact: '9321889742',
        name: 'User1',
      },
      theme: { color: '#00658d' },
    }
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log(`Payment success: ${data.razorpay_payment_id}`);
        navigate.navigate('MainHome');

      })
      .catch((error) => {
        // handle failure
        console.log(`Error: ${error.description} | ${error.code}`);
      });
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:vw(5),paddingBottom:vh(10)}}>
        {
          !object ? 
            <View className='mt-40'>
              <Image source={image.searchAstro} style={{width:300,height:300,borderRadius:150,alignSelf:'center'}}/>
              <Text style={[styles.text,{textAlign:'center'}]}>Cart is empty !!</Text>
            </View>:
            <View>
              {
                activepage == 'buy' ?
                  // Buy the product
                  <View>

                    <View className='flex flex-row shadow-xl shadow-black' style={styles.box1}>
                      <Image source={{uri:urlFor(object.image).url()}} style={{width:vw(35),height:vh(20),borderRadius:25}}/>
                      <View style={styles.Minibox}>
                        <Text style={[styles.header,{marginBottom:vh(1)}]}>{object.name}</Text>
                        <Text style={styles.text}>Owned by: {object.manu}.</Text>
                      </View>
                    </View>

                    <View className='mt-5 shadow-xl shadow-black' style={styles.box1} >
                      <Text style={[styles.text,{textAlign:'center'}]}>Product Price : {object.cost}</Text>
                      <Text style={[styles.text,{textAlign:'center'}]}>GST Applied {GST}% : {GSTAMOUNT} </Text>
                      <Text style={[styles.text,{textAlign:'center',color:TEXTCOLOR.secondary}]}>Free Shipping</Text>
                      
                      <Text style={[styles.text,{textAlign:'center',marginTop:vh(2)}]}>Long press to pay</Text>
                      <TouchableOpacity onPress={handlePayment} style={styles.PayBtn} className='p-5 pb-6 mt-5 mb-5 shadow-xl shadow-black self-center'>
                          <Text style={{...COMMONTEXT.fourth,color:TEXTCOLOR.primary,textAlign:'center'}}>PAY  &#8377;{TOTAL_AMOUNT}</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={[styles.header,{textAlign:'center',marginTop:vh(2)}]}>OR</Text>
                    
                    <View className='mt-5 shadow-xl shadow-black' style={styles.box1}>
                      <Text style={[styles.text,{textAlign:'center'}]}>Cash on Delivery</Text>

                      <TouchableOpacity>
                        <Checkbox colorScheme={'amber'}>
                          <Text style={[styles.text,{color:TEXTCOLOR.secondary,width:vw(75)}]}>Post to this Address: {user_address}</Text>
                        </Checkbox>
                      </TouchableOpacity>
                    </View>

                  </View> 
                  :
                  // Own it as NFT
                  <View>
                    <View className='mt-5 p-5 shadow-xl shadow-black' style={styles.box1}>
                      <Image source={{uri:urlFor(object.image).url()}} style={{width:vw(80),height:vh(50),borderRadius:15,alignSelf:'center'}}/>
                      <Text style={[styles.header,{margin:vw(2)}]}>{object.name}</Text>
                      <Text style={[styles.text,{marginLeft:vw(2)}]}>Owned by: {object.manu}.</Text>
                      <Text style={[styles.text,{marginLeft:vw(2),marginTop:(1)}]}>Token id : {uuid}</Text>
                    </View>

                    <View className='flex flex-row mt-5 p-5 justify-between shadow-xl shadow-black' style={styles.box1}>
                      <Text style={{...COMMONTEXT.fourth,color:TEXTCOLOR.secondary}}>Place the Bid</Text>

                      <TouchableOpacity style={styles.PayBtn} className='p-4 mt-2 mb-2 shadow-xl shadow-black'>
                        <Text style={{...COMMONTEXT.fourth,color:TEXTCOLOR.primary,textAlign:'center'}}>{object.nft} ETH</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              }
            </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  PayBtn:{
    backgroundColor:COLORS.motoblue,
    width:vh(20),
    borderRadius:20,
  },
  Minibox:{
    width:vw(50),
    padding:10,
  },
  box1:{
    backgroundColor:COLORS.gradientGray,
    borderRadius:25,
    padding:vw(3),
    width:vw(90),
  },
  header:{
    color:TEXTCOLOR.secondary,
    ...COMMONTEXT.tertiary,
  },
  desc:{
    ...COMMONTEXT.secondary,
  },
  text:{
    ...COMMONTEXT.semisecondary,
  }
})

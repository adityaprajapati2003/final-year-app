import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View ,Image, TouchableOpacity, FlatList, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';
import { COLORS, TEXTCOLOR, icons, image } from '../constants';
import { COMMONTEXT } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import * as Crypto from 'expo-crypto';
import RazorpayCheckout from 'react-native-razorpay';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../authentication/firebase/firebase';
import { urlFor } from '../sanity';
import { removeFromCart } from '../toolkit/reducers/CartActions';
import { cart } from '../toolkit/reducers/UserAuth';

const Cart = () => {
  // navigate to home page
  const navigate = useNavigation();

  // dispatcher 
  const dispatch = useDispatch();

  const [location,setLocation] = useState({
    street_address: "",
    apartment: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // state for payment + calculate gst also
  const GST = 18; 

  useEffect(()=>{
    const getAddress = async()=>{
      try{
        let fetch_profile =  await getDoc(
          doc(collection(firestore, "users_collections_data"), email)
        );
        setLocation({
          street_address: fetch_profile.data().address.StreetAddress,
          apartment: fetch_profile.data().address.Apartment,
          city: fetch_profile.data().address.City,
          state: fetch_profile.data().address.State,
          zipcode: fetch_profile.data().address.ZipCode,
        });
        
      }catch(e){
        console.log("error while fetching",e);
      }
    }
    getAddress();
  },[]);

  // fetch values from redux
  const email = useSelector((state)=>state.user.email);
  const got_image = useSelector((state)=>state.user.image_uri);
  const got_name = useSelector((state)=>state.user.product_name);
  const got_owner = useSelector((state)=>state.user.owner_name);
  const got_amount = useSelector((state)=>state.user.amount);
  const got_crypto = useSelector((state)=>state.user.crypto_price);
  const activepage = useSelector((state)=>state.user.page);
  let cartItems = useSelector((state)=>state.cart.items);
 
  const TOTAL_COST_OF_CART_ITEMS = cartItems.reduce((total,item)=>total + item.cost,0);
  if(TOTAL_COST_OF_CART_ITEMS){
    let _amount = parseInt(TOTAL_COST_OF_CART_ITEMS);
    var GST_CART_AMOUNT = _amount * GST / 100;
    var TOTAL_AMOUNT_CART = _amount + GST_CART_AMOUNT;
  }

  if(got_amount){
      let amount = parseInt(got_amount);
      var GSTAMOUNT = amount * GST / 100;
      var TOTAL_AMOUNT = amount + GSTAMOUNT;
  }
  const uuid = Crypto.randomUUID();

  // handle payment 
  const handlePaymentSuccess = async(data)=> {
    const getEmail = useSelector((state)=>state.user.email);
    const newPaymentData = {
      paymentId:data.razorpay_payment_id,
      amount:data.amount,
      product:data.product,
      quantity:data.quantity,
    }
    try{
      await addDoc(doc(collection(firestore,'user_payment_data'),getEmail),{
        newPaymentData
      })
      console.log('Payment data added to Firestore for user:', userEmail);
    }catch(e){
      console.error('Error adding payment data to Firestore:', error);
    }
  }

  const handlePayment =()=>{
    const options ={
      key: 'rzp_test_agN5mjpFgt4knN',
      amount:Math.round(TOTAL_AMOUNT*100), // Amount in paisa
      name: 'Kajri NFT marketPlace',
      description:'Kajri App encrypted payments razorpay',
      image: icons.k, // optional
      prefill: {
        email: email,
        contact: '9321889742',
        name: email,
      },
      theme: { color: '#00658d' },
      notes:{
        product:got_name,
        quantity:1,
      }
    }
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log(`Payment success: ${data.razorpay_payment_id}`);
        handlePaymentSuccess(data);
        navigate.navigate('MainHome');

      })
      .catch((error) => {
        // handle failure
        console.log(`Error: ${error.description} | ${error.code}`);
      });
  }
  
  // synced button events
  const handleBuyCartGoHome =()=>{
    alert('Product will be deliverd to you soon 😊');
    setTimeout(()=>{
      navigate.navigate('Home');
      dispatch(cart({image_uri:'',product_name:'',owner_name:'',amount:null,crypto_price:null}))
    },2000)
  }

  const handleOwnItCartGoHome =()=>{
    alert('The bid is being placed 🫡');
    setTimeout(()=>{
      navigate.navigate('Home');
      dispatch(cart({image_uri:'',product_name:'',owner_name:'',amount:null,crypto_price:null}))
    },1000)
  }

  const handleRemoveFromCart =(itemId)=>{
    dispatch(removeFromCart(itemId));
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:vw(5),paddingBottom:vh(10)}} >
        {
          cartItems && TOTAL_COST_OF_CART_ITEMS ?
            (
              <View className='flex flex-col shadow-xl shadow-black mb-5 p-2' style={styles.box1}>
                <Text style={{...COMMONTEXT.tertiary,margin:5}}>Cart Items</Text>
                {cartItems.map((item)=>{
                  return(
                    <View key={item.id} style={{borderColor:COLORS.motoblue,borderWidth:1,padding:5,marginTop:10,borderRadius:25}}>
                        <View className='flex flex-row shadow-black m-2'>
                          <Image source={{uri:urlFor(item.image).url()}} style={{width:vw(35),height:vh(20),borderRadius:25}}/>
                          <View style={{padding:10}}>

                            <TouchableOpacity onPress={()=>handleRemoveFromCart(item.id)}>
                              <Image source={icons.trash} style={{width:30,height:30,alignSelf:'flex-end',marginRight:15,marginBottom:10}}/>
                            </TouchableOpacity>

                            <Text style={[styles.desc,{width:vw(45)}]} >{item.description}</Text>
                            <Text style={styles.text}>Product price :  &#8377;{item.cost}</Text>
                          </View>
                        </View>
                    </View>
                  )
                })}
                 <TouchableOpacity onPress={handlePayment} style={styles.PayBtn} className='p-2 pb-4 mt-5 mb-5 mr-5 shadow-xl shadow-black self-end'>
                    <Text style={{...COMMONTEXT.fourth,color:TEXTCOLOR.primary,textAlign:'center'}}>PAY  &#8377;{TOTAL_AMOUNT_CART}</Text>
                  </TouchableOpacity>
              </View>
            ) : ("")
        }
      <Text style={[styles.text,{margin:10}]}>Product you looked for</Text>
        {
          !got_image? 
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
                      <Image source={{uri:got_image}} style={{width:vw(35),height:vh(20),borderRadius:25}}/>
                      <View style={styles.Minibox}>
                        <Text style={[styles.header,{marginBottom:vh(1)}]}>{got_name}</Text>
                        <Text style={styles.text}>Owned by: {got_owner}.</Text>
                      </View>
                    </View>

                    <View className='mt-5 shadow-xl shadow-black' style={styles.box1} >
                      <Text style={[styles.text,{textAlign:'center'}]}>Product Price : {got_amount}</Text>
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

                      <TouchableOpacity className='flex flex-row mt-2' onPress={handleBuyCartGoHome}>
                          <Image source={icons.cod} style={{width:50,height:50, margin:5}} />
                          <Text style={[styles.text,{color:TEXTCOLOR.secondary,width:vw(75),marginTop:5}]}>Post to this Address: {location.street_address}</Text>
                      </TouchableOpacity>
                    </View>

                  </View> 
                  :
                  // Own it as NFT
                  <View>
                    <View className='mt-5 p-5 shadow-xl shadow-black' style={styles.box1}>
                      <Image source={{uri:got_image}} style={{width:vw(80),height:vh(50),borderRadius:15,alignSelf:'center'}}/>
                      <Text style={[styles.header,{margin:vw(2)}]}>{got_name}</Text>
                      <Text style={[styles.text,{marginLeft:vw(2)}]}>Owned by: {got_owner}.</Text>
                      <Text style={[styles.text,{marginLeft:vw(2),marginTop:(1)}]}>Token id : {uuid}</Text>
                    </View>

                    <View className='flex flex-row mt-5 p-5 justify-between shadow-xl shadow-black' style={styles.box1}>
                      <Text style={{...COMMONTEXT.fourth,color:TEXTCOLOR.secondary}}>Place the Bid</Text>

                      <TouchableOpacity style={styles.PayBtn} className='p-4 mt-2 mb-2 shadow-xl shadow-black' onPress={handleOwnItCartGoHome}>
                        <Text style={{...COMMONTEXT.fourth,color:TEXTCOLOR.primary,textAlign:'center'}}>{got_crypto} ETH</Text>
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

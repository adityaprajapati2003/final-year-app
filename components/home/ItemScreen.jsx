import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { urlFor } from '../../sanity';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import { COLORS, COMMONTEXT, TEXTCOLOR, icons, image } from '../../constants';
import AttributeHolders from './AttributeHolders';
import { SimpleAnimation } from "react-native-simple-animations";
import * as Crypto from 'expo-crypto';
import { cart, page } from '../../toolkit/reducers/UserAuth';

const ItemScreen = () => {
    // Load all parameters shows loading 
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1000)

    const { params } = useRoute();
    let product = params; // these are products or items imported.😍

    // Setting the navigation channels
    const NavigateMe = useNavigation();

    // Storing the data in redux
    const dispatch = useDispatch();
    let IMAGE_URL = urlFor(product.image).url();

    const buyBtn = () => {
        dispatch(page({ page: 'buy' }));
        if(IMAGE_URL){
            dispatch(cart({image_uri:IMAGE_URL,product_name:product.name,owner_name:product.manu,amount:product.cost,crypto_price:product.nft}))
        }
        NavigateMe.navigate('cart');
    }
    
    const ownBtn = () => {
        dispatch(page({ page: 'own' }));
        if(IMAGE_URL){
            dispatch(cart({image_uri:IMAGE_URL,product_name:product.name,owner_name:product.manu,amount:product.cost,crypto_price:product.nft}))
        }
        NavigateMe.navigate('cart');
    }

    // Handle local linking events
    const handleCall = () => {
        let number = 9321889742;
        const phonenumber = `${Platform.OS !== 'android' ? 'telprompt' : 'tel'}:${number}`;
        try {
            const supported = Linking.canOpenURL(phonenumber);
            if (supported) { Linking.openURL(phonenumber) }
        } catch (error) {
            console.log(error);
        }
    }
    const handleEmail = () => {
        let email = 'cukoobee2901@gmail.com';
        try {
            Linking.openURL(`mailto:${email}?subject=SendMail&body=Description`);
        } catch (e) {
            console.log(e);
        }
    }

    // generating crypto id
    const uuid = Crypto.randomUUID();

    return (
        <SafeAreaView>
            {loading ?
                <View className='self-center top-48 '>
                    <Image source={image.comet} style={{ width: 300, height: 300 }} />
                    <Text style={{ ...COMMONTEXT.tertiary, color: TEXTCOLOR.secondary, alignSelf: 'center' }}>Loading...</Text>
                </View>
                :
                <SimpleAnimation delay={500} duration={500} fade movementType="slide">
                    <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}
                        contentContainerStyle={{ paddingTop: vh(2), paddingBottom: vh(10), paddingLeft: vw(7), paddingRight: vw(7) }}>

                        {/* text and content of product */}
                        <View>
                            <Text style={styles.header}>{product.name}</Text>
                            <Text style={styles.desc}>{product.description}.</Text>
                            <Text style={styles.text}>Owned by : {product.manu}</Text>
                            <Image source={{ uri: urlFor(product.image).url() }} style={styles.Image} />
                            <View className="flex flex-row">
                                <AttributeHolders Icon={icons.eth} attribute={product.nft} />
                                <AttributeHolders Icon={icons.show} attribute={product.views} />
                                <AttributeHolders Icon={icons.star} attribute={product.ratings} />
                            </View>

                            <View className='flex flex-row mt-2 mb-2'>
                                <Image source={icons.r} style={{ width: 30, height: 30, marginTop: 5 }} />
                                <Text style={{ ...COMMONTEXT.fifth, color: TEXTCOLOR.secondary }}>{product.cost}</Text>
                            </View>

                            {product.offers ?
                                <Text style={styles.desc}>Offers: {product.offers}.</Text> : ""
                            }

                            {/* Events for contacting for any queries */}
                            <Text style={{ ...COMMONTEXT.primary, marginTop: vh(1) }}>For any Queries : </Text>
                            <TouchableOpacity onPress={handleCall}>
                                <Text style={[styles.text, { color: TEXTCOLOR.secondary }]}>Contact Dealer : 9321889741</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleEmail}>
                                <Text style={[styles.text, { color: TEXTCOLOR.secondary, marginBottom: vh(1) }]}>Mail Dealer : cukoobee2901@gmail.com</Text>
                            </TouchableOpacity>
                            <Text style={styles.desc}>Token id : {uuid}</Text>
                        </View>

                        {/* buttons to proceed the process */}
                        <View className={`flex flex-row ${product.nft ? `justify-between` : `justify-center`}`}>
                            <TouchableOpacity onPress={buyBtn} className='shadow-lg shadow-black' style={styles.btnContainer}>
                                <Text style={styles.btnText}>Buy</Text>
                            </TouchableOpacity>

                            {product.nft ?
                                <TouchableOpacity onPress={ownBtn} className='shadow-lg shadow-black' style={styles.btnContainer}>
                                    <Text style={styles.btnText}>Own it</Text>
                                </TouchableOpacity> : ""}
                        </View>

                        {/* facility provided to end customer */}
                        <View style={styles.facilities} className='shadow-lg shadow-black'>
                            <View>
                                <Image source={icons.cod} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={styles.f}>Cash on delivery</Text>
                            </View>
                            <View>
                                <Image source={icons.replace} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={styles.f}>10 days replacement</Text>
                            </View>
                            <View>
                                <Image source={icons.legal} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={styles.f}>GI tag and govt. approved</Text>
                            </View>
                            <View>
                                <Image source={icons.truck} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={styles.f}>Free delivery</Text>
                            </View>
                        </View>

                    </ScrollView>
                </SimpleAnimation>
            }
        </SafeAreaView>
    )
}

export default ItemScreen

const styles = StyleSheet.create({
    header: {
        color: TEXTCOLOR.secondary,
        ...COMMONTEXT.fourth,
    },
    desc: {
        ...COMMONTEXT.secondary,
    },
    text: {
        marginTop: 2,
        ...COMMONTEXT.semisecondary,
    },
    Image: {
        marginTop: vh(1),
        marginBottom: vh(1),
        width: vw(86),
        height: vh(40),
        alignSelf: 'center',
        borderRadius: 25,
    },
    btnText: {
        textAlign: 'center',
        ...COMMONTEXT.tertiary,
    },
    btnContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 15,
        marginBottom: 15,
        width: vw(40),
        borderRadius: 25,
        backgroundColor: COLORS.gradientGray,
    },
    facilities: {
        flexDirection: 'row',
        backgroundColor: COLORS.gradientGray,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingLeft: 5,
        borderRadius: 25,
    },
    f: {
        ...COMMONTEXT.primary,
        width: vw(20),
        textAlign: 'center',
        margin: 1,
    }
})
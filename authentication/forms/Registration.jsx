import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { signupSchema } from '../schema/signupSchema'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { COLORS, COMMONTEXT, TEXTCOLOR } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const Registration = () => {
    const navigateMe = useNavigation();

    //Handing Signup event
    const  handleSignUp = async (values) =>{
        try{
            const {email,password} = values;
            console.log(email,password);
            await createUserWithEmailAndPassword(auth,email,password);
            navigateMe.navigate('signin');
        }catch(e){
            console.log(e);
        }    
    }
   
  return (
    <Formik
        initialValues={{
            email:"",
            username:"",
            password:"",
            retype_password:"",
        }}
        validationSchema={signupSchema}
        onSubmit={handleSignUp}
    >
        {({ handleChange, handleSubmit, values ,isValid, errors, touched}) => (
            <View>
                
                <TextInput 
                    values={values.email} 
                    onChangeText={handleChange('email')}
                    style={styles.TextInput}
                    placeholder='Set Email'
                    placeholderTextColor='gray'
                />
                { touched.email && errors.email ? <Text style={styles.ErrorText}>{errors.email}</Text>:""}
                
                <TextInput 
                    values={values.username}
                    onChangeText={handleChange('username')}
                    style={styles.TextInput}
                    placeholder='Create Username'
                    placeholderTextColor='gray'
                />
                { touched.username && errors.username ? <Text style={styles.ErrorText}>{errors.username}</Text>:""}
                
                <TextInput 
                    values={values.password} 
                    onChangeText={handleChange('password')}
                    style={styles.TextInput}
                    placeholder='Create Password'
                    placeholderTextColor='gray'
                />
                { touched.password && errors.password ? <Text style={styles.ErrorText}>{errors.password}</Text>:""}
                
                <TextInput 
                    values={values.retype_password} 
                    onChangeText={handleChange('retype_password')}
                    style={styles.TextInput}
                    placeholder='Retype Password'
                    placeholderTextColor='gray'
                />
                { touched.retype_password && errors.retype_password ? <Text style={styles.ErrorText}>{errors.retype_password}</Text>:""}
                <TouchableOpacity onPress={handleSubmit} >
                    <Text style={styles.Register} className="shadow-lg shadow-gray-950">Register</Text>
                </TouchableOpacity>
            </View>
        )}
    </Formik>
  )
}
const styles = StyleSheet.create({
    TextInput:{
        width: vw(80),
        height: vh(7),
        marginTop: vh(3),
        borderRadius: 25,
        borderWidth:1,
        borderColor:TEXTCOLOR.secondary,
        paddingLeft: vw(5),
        paddingRight: vw(5),
        ...COMMONTEXT.tertiary,
    },
    ErrorText:{
        paddingLeft:vw(5),
        height:vh(3),
        marginTop:vh(1),
        ...COMMONTEXT.primary,
    },
    Register:{
        width:vw(45),
        marginTop:vh(5),
        alignSelf:'center',
        textAlign:'center',
        padding:10,
        borderRadius:50,
        backgroundColor:COLORS.motoblue,
        color:TEXTCOLOR.primary,
        ...COMMONTEXT.fourth,
    },
})


export default Registration
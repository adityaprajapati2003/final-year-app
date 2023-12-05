import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { ForgotSchema } from '../schema/ForgotSchema'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen"
import { COLORS, COMMONTEXT, TEXTCOLOR } from '../../constants'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const Forgot = () => {

    const handleResetPassword = async (values) => {
        try {
            const { email } = values;
            await sendPasswordResetEmail(auth, email);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={ForgotSchema}
            onSubmit={handleResetPassword}
        >
            {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
                <View>
                    <TextInput
                        values={values.email}
                        onChangeText={handleChange('email')}
                        style={styles.TextInput}
                        placeholder='Enter your email'
                        placeholderTextColor='gray'
                    />
                    {touched.email && errors.email ? <Text style={styles.ErrorText}>{errors.email}</Text> : ""}

                    <TouchableOpacity onPress={handleSubmit} >
                        <Text style={styles.Register} className="shadow-lg shadow-gray-950">Send Email</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}

export default Forgot

const styles = StyleSheet.create({
    TextInput: {
        width: vw(80),
        height: vh(7),
        marginTop: vh(3),
        borderRadius: 25,
        borderWidth: 1,
        borderColor: TEXTCOLOR.secondary,
        paddingLeft: vw(5),
        paddingRight: vw(5),
        ...COMMONTEXT.tertiary,
    },
    ErrorText: {
        paddingLeft: vw(5),
        height: vh(3),
        marginTop: vh(1),
        ...COMMONTEXT.primary,
    },
    Register: {
        width: vw(45),
        marginTop: vh(4),
        alignSelf: 'center',
        textAlign: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: COLORS.motoblue,
        color: TEXTCOLOR.primary,
        ...COMMONTEXT.fourth,
    },
})
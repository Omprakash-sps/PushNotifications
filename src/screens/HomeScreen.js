import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import { requestUserPermission, Notificationservices, Foreground } from '../utils/pushNotifications';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'react-native-vector-icons/Icon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoginScreen, { SocialButton } from "react-native-login-screen";
import Signup from './Signup';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../utils/firebase_config';

const HomeScreen = ({ navigation }) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => {
                console.log('Signed In!')
                const user = userCredential.user;
                console.log(user)
                navigation.navigate(ChatScreen)
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
    }

    useEffect(() => {
        requestUserPermission();
        Notificationservices(navigation);
        Foreground(navigation);
    }, []);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
            <Text style={{ fontSize: 30, color: 'orange', marginLeft: wp(40), marginTop: hp(20) }}>Login</Text>
            <View style={{ borderRadius: 5, marginHorizontal: 23, paddingHorizontal: 10, borderWidth: 1, marginTop: 15 }}>
                <TextInput
                    value={mail}
                    placeholder='Email'
                    onChangeText={value => setMail(value)}
                    style={{ height: 50 }}
                />
            </View>
            <View style={{ borderRadius: 5, marginHorizontal: 23, marginTop: 20, paddingHorizontal: 10, borderWidth: 1 }}>
                <TextInput
                    value={password}
                    placeholder='Password'
                    onChangeText={value => setPassword(value)}
                    style={{ height: 50 }}
                />
            </View>
            <TouchableOpacity style={{ height: 40, borderRadius: 10, marginHorizontal: 23, marginTop: 20, paddingHorizontal: 10, backgroundColor: 'orange', alignItems: 'center' }} onPress={handleSignIn}>
                <Text style={{ fontWeight: 'bold', padding: 11 }}>Login</Text>
            </TouchableOpacity>
            <View style={{ marginTop: hp(2), marginLeft: wp(5) }}>
                <SocialButton text="Continue with Google"
                    imageSource={require("../../assets/gmail.png")}
                    onPress={() => { }} />
            </View>
            <View style={{ marginTop: hp(2), marginLeft: wp(5) }}>
                <SocialButton
                    text="Continue with Facebook"
                    imageSource={require("../../assets/facebook.png")}
                    onPress={() => { }}
                />
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
                    <View style={{ paddingHorizontal: 2 }}>
                        <Text
                            style={[
                                styles.color_textPrivate,
                                { color: 'orange' },
                            ]}>
                            Sign Up
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        paddingHorizontal: 12,
        fontSize: 20,
        marginTop: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container: {
        marginTop: 5,
        marginBottom: 150,
        width: '80%',
        borderColor: '#ccc',

        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        padding: 4,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: wp(3),
        height: hp(3),
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
        marginBottom: 10,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        fontWeight: '400',
        color: 'grey',
    },

});
export default HomeScreen;
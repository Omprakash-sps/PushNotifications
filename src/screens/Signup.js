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
import { setDoc, doc } from 'firebase/firestore';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoginScreen, { SocialButton } from "react-native-login-screen";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../utils/firebase_config';
import HomeScreen from './HomeScreen';
import { getFirestore } from 'firebase/firestore/lite';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Signup = ({ navigation }) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    GoogleSignin.configure({
        webClientId: '463982608574-vtls7vdesvn9b6pbku9r1e5m96i2avhf.apps.googleusercontent.com',
    });

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const setFirestoreData = async () => {
        // await setDoc(doc(db, "Users", mail), {
        //     email: mail,
        //     password: password,
        //     country: "IN"
        // }).then((res) => {
        //     console.log(res)
        // }).catch((err) => {
        //     console.log(err);
        // })
        await firestore()
            .collection('Users')
            .doc(mail)
            .set({
                name: mail,
                age: password,
            })
            .then(() => {
                console.log('User added!');
            });
    }

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => {
                console.log('Account created!')
                setFirestoreData();
                const user = userCredential.user;
                console.log(user)
                navigation.navigate(HomeScreen)
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
    }

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
            <Text style={{ fontSize: 30, color: 'orange', marginLeft: wp(40), marginTop: hp(10) }}>Signup</Text>
            <View style={{ borderRadius: 5, marginHorizontal: 23, paddingHorizontal: 10, borderWidth: 1, marginTop: hp(2) }}>
                <TextInput
                    value={mail}
                    placeholder='Email'
                    onChangeText={value => setMail(value)}
                    style={{ height: 35 }}
                />
            </View>
            <View style={{ borderRadius: 5, marginHorizontal: 23, paddingHorizontal: 10, borderWidth: 1, marginTop: hp(2) }}>
                <TextInput
                    value={password}
                    placeholder='Password'
                    onChangeText={value => setPassword(value)}
                    style={{ height: 35 }}
                />
            </View>
            <TouchableOpacity style={{ height: 40, borderRadius: 10, marginHorizontal: 23, marginTop: 20, paddingHorizontal: 10, backgroundColor: 'orange', alignItems: 'center' }} onPress={handleCreateAccount}>
                <Text style={{ fontWeight: 'bold', padding: 11 }}>Signup</Text>
            </TouchableOpacity>
            <View style={{ marginTop: hp(2), marginLeft: wp(5) }}>
                <SocialButton text="Continue with Google"
                    imageSource={require("../../assets/gmail.png")}
                    onPress={onGoogleButtonPress} />
            </View>
            <View style={{ marginTop: hp(2), marginLeft: wp(5) }}>
                <SocialButton
                    text="Continue with Facebook"
                    imageSource={require("../../assets/facebook.png")}
                    onPress={() => { }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
export default Signup;
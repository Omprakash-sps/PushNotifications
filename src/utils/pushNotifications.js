import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        Getfcmtoken();
    }
}

const Getfcmtoken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('oldToken', fcmToken)
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log('new token', fcmToken)
                await AsyncStorage.setItem('fcmtoken', fcmToken)
            }
        } catch (error) {
            console.log(error, 'error raised in fcmtoken')
        }
    }
}

const StoreData = async (obj) => {
    let data = await AsyncStorage.getItem('notifyData');
    let datas = JSON.parse(data);
    console.log('data', datas);
    if (data != null) {
        let tempData = [...datas];
        tempData.push(obj);
        await AsyncStorage.setItem('notifyData', JSON.stringify(tempData));
    } else {
        let tempData = [];
        tempData.push(obj);
        await AsyncStorage.setItem('notifyData', JSON.stringify(tempData));
    }
}


export const Notificationservices = (navigation) => {

    // const navigation = useNavigation();
    // console.log(navigation);
    // Check whether an Notification caused app to open from background state
    messaging().onNotificationOpenedApp(async remoteMessage => {
        const { notification } = remoteMessage
        console.log(
            'Notification caused app to open from background state:',
            notification,
        );

        let obj = {
            tittle: notification.title,
            body: notification.body
        }
        StoreData(obj)
        navigation.navigate('ChatScreen');
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(async remoteMessage => {
            if (remoteMessage) {
                const { notification } = remoteMessage
                console.log(
                    'Notification caused app to open from quit state:',
                    notification,
                );
                let obj = {
                    tittle: notification.title,
                    body: notification.body
                }
                StoreData(obj);
                navigation.navigate('ChatScreen');
            }
        });
}

export const Foreground = (navigation) => {
    // const navigation = useNavigation();
    //Check whether an Notification caused app to open from background state
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log('Notification in foregroud:', remoteMessage)
        const { notification } = remoteMessage
        let obj = {
            tittle: notification.title,
            body: notification.body
        }
        StoreData(obj);
        //navigation.navigate('ChatScreen');

    });

    return unsubscribe;
}


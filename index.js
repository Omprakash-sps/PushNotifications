/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';


messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    PushNotification.localNotification({
        channelId: "your-channel-id",
        id: remoteMessage.messageId,
        body: remoteMessage.body,
        title: remoteMessage.tittle,
        soundName: 'default',
        vibrate: true,
        playSound: true
    })
});
AppRegistry.registerComponent(appName, () => App);

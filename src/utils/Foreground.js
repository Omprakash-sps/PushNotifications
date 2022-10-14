import PushNotification from "react-native-push-notification";
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

const Foreground = () => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
        console.log('Notification in foregroud:', remoteMessage)
        const { notification, messageId } = remoteMessage

        PushNotification.localNotification({
            channelId: "your-channel-id",
            id: messageId,
            body: 'android body',
            title: 'android title',
            soundName: 'default',
            vibrate: true,
            playSound: true
        })
    });
}

export default Foreground;
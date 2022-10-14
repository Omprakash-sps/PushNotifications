import React, { useEffect } from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { requestUserPermission, Notificationservices, Foreground } from '../utils/pushNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatScreen = () => {
    const [state, setState] = React.useState([]);

    useEffect(() => {
        getData();
    })

    const getData = async () => {
        let data = await AsyncStorage.getItem('notifyData');
        let datas = JSON.parse(data);
        if (datas != null) {
            setState(datas);
        }
    }

    return (
        <ScrollView>
            <View style={styles.sectionContainer}>
                <Button
                    title='Notification Screen '
                // onPress={deeplinkingnotification}
                />
                {
                    state.map((itm, ind) => {
                        return (
                            <View key={ind.toString()} style={{ backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingVertical: 5 }}>
                                <Text>{itm.tittle}</Text>
                                <Text>{itm.body}</Text>
                            </View>
                        )
                    })
                }

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default ChatScreen;

import { Button, StyleSheet, Text, Image, TouchableOpacity, View, Platform } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Ear } from './images';

export const SettingsScreen = () => {
    return (
        <View style={Settings.background}>
            <View style={Settings.header}>
                <Text style={Settings.headerText}>Settings</Text>
            </View>

            <View style={Settings.buttonContainer}>
                <View style={Settings.settingsButton}>
                    <Ear style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>Read Aloud</Text>
                </View>


            </View>

        </View>
    )
}

const Settings = StyleSheet.create({
    background: {
        backgroundColor: "#F2F1F7",
        marginLeft: 25,
        marginRight: 25
    },
    header: {
        marginTop: 110
    },
    headerText: {
        fontSize: Platform.select({
            ios: 37
        }),
        fontWeight: Platform.select({
            ios: '500'
        })
    },
    settingsButton: {
        backgroundColor: 'white',
        height: 75,
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: Platform.select({
            ios: 20, 
        }),
        fontWeight: Platform.select({
            ios: '500'
        }),
        marginStart: Platform.select({
            ios: 35
        })
    },
    buttonContainer: {
        marginTop: 25
    },
    buttonImage: {
        marginStart: Platform.select({
            ios: 45
        })
    }
})
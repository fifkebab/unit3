import { Button, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
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
                    <Ear />
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
        fontSize: 45,
        fontWeight: "800"
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
        fontSize: 25,
        fontWeight: "500"
    },
    buttonContainer: {
        marginTop: 25
    }
})
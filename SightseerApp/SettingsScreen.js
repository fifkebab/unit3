import { Button, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

export const SettingsScreen = () => {
    return (
        <View style={Settings.background}>
            <View style={Settings.header}>
                <Text style={Settings.headerText}>Settings</Text>
            </View>

            <View>
                <View style={Settings.settingsButton}>
                    <Image 
                    source={require("./images/ear.svg")}
                    />
                </View>


            </View>

        </View>
    )
}

const Settings = StyleSheet.create({
    background: {
        backgroundColor: "#F2F1F7",
        marginLeft: 25
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
    }
})
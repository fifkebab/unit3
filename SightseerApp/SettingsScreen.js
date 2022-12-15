import { Button, StyleSheet, Text, Image, TouchableOpacity, View, Platform, Alert } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Contrast, Ear, ViewIcon, Focus, CheckmarkIcon } from './images';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsScreen = () => {
    const [SettingsWorker, setSettings] = useState({})

    const SettingsLoad = async() => {
        setSettings(JSON.parse(await AsyncStorage.getItem('Settings')));
        if (SettingsWorker == null) {
            Alert.alert('Settings Not Found', 'Relaunch SightSeer to attempt to rediscover settings.');
        }
    }

    SettingsLoad()

    const toggleSetting = async(setting) => {
        console.log(`Toggling ${setting}`);
        const exportedWorker = SettingsWorker;

        if (!exportedWorker[setting]) {
            exportedWorker[setting] = true
        } else {
            exportedWorker[setting] = false
        }

        setSettings(exportedWorker);

        await AsyncStorage.setItem('Settings', JSON.stringify(exportedWorker));
    }

    return (
        <View style={Settings.background}>
            <View style={Settings.header}>
                <Text style={Settings.headerText}>Settings</Text>
            </View>

            <View style={Settings.buttonContainer}>

                <TouchableOpacity 
                style={Settings.settingsButton}
                onPress={() => { toggleSetting('read-aloud') }}
                >
                    <Ear style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>Read Aloud</Text>
                    <CheckMark checked={SettingsWorker['read-aloud']}/>
                </TouchableOpacity>

                <TouchableOpacity 
                style={Settings.settingsButton} 
                onPress={() => { toggleSetting('high-contrast') }}
                >
                    <Contrast style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>High Contrast</Text>
                    <CheckMark checked={SettingsWorker['high-contrast']}/>
                </TouchableOpacity>

                <TouchableOpacity 
                style={Settings.settingsButton} 
                onPress={() => { toggleSetting('transparency')}}
                >
                    <ViewIcon style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>Transparency</Text>
                    <CheckMark checked={SettingsWorker['transparency']}/>
                </TouchableOpacity>

                <TouchableOpacity 
                style={Settings.settingsButton} 
                onPress={() => { toggleSetting('scan-automatically')}}
                >
                    <Focus style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>Scan Automatically</Text>
                    <CheckMark checked={SettingsWorker['scan-automatically']}/>
                </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        gap: 50
    },
    text: {
        // width: "100%",
        fontSize: Platform.select({
            ios: 20, 
            android: 20
        }),
        fontWeight: Platform.select({
            ios: '500',
            android: 'bold'
        }),
        marginStart: Platform.select({
            ios: 35,
            android: 20
        })
    },
    buttonContainer: {
        marginTop: 25,
        gap: 10,
        display: 'flex'
    },
    buttonImage: {
        minWidth: 30,
        height: 30,
    }
});


export const CheckMark = (props) => {
    return (
        <CheckmarkIcon style={StyleSheet.buttonImage} strokeWidth={2.5} stroke={props.checked ? '#E00000' : 'white'} />
    )
}
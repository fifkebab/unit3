import { Button, StyleSheet, Text, Image, TouchableOpacity, View, Platform, Alert, Animated, Pressable } from 'react-native';
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
        // Get the current settings;
        const exportedWorker = SettingsWorker;

        // Check if the setting is on or off;
        if (!exportedWorker[setting]) {
            // If it's off, turn it on;
            exportedWorker[setting] = true
        } else {
            // If it's on, turn it off;
            exportedWorker[setting] = false
        }

        // Save the settings to the copy in memory;
        setSettings(exportedWorker);

        // Save the settings to the async storage;
        await AsyncStorage.setItem('Settings', JSON.stringify(exportedWorker));
    }

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    return (
        <View style={Settings.background}>
            <View style={Settings.header}>
                <Text style={Settings.headerText}>Settings</Text>
            </View>

            <Animated.View style={Settings.buttonContainer}>

                <Pressable 
                style={Settings.settingsButton}
                onPress={() => { toggleSetting('read-aloud') }}
                
                >
                    <Ear style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>Read Aloud</Text>
                    <CheckMark checked={SettingsWorker['read-aloud']}/>
                </Pressable>

                <Pressable 
                style={Settings.settingsButton} 
                onPress={() => { toggleSetting('high-contrast') }}
                 
                >
                    <Contrast style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>High Contrast</Text>
                    <CheckMark checked={SettingsWorker['high-contrast']}/>
                </Pressable>

                <Pressable 
                style={Settings.settingsButton} 
                onPress={() => { toggleSetting('transparency')}}
                
                >
                    <ViewIcon style={StyleSheet.buttonImage} strokeWidth={2.5}/>
                    <Text style={Settings.text}>Transparency</Text>
                    <CheckMark checked={SettingsWorker['transparency']}/>
                </Pressable>

                <Pressable 
                style={Settings.settingsButton} 
                onPress={() => { toggleSetting('scan-automatically')}}
                
                >
                    <Focus style={StyleSheet.buttonImage} stroke="black" strokeWidth={2.5}/>
                    <Text style={Settings.text}>Scan Automatically</Text>
                    <CheckMark checked={SettingsWorker['scan-automatically']}/>
                </Pressable>

                {
                    SettingsWorker['scan-automatically'] && 
                    <Text>Identify items just by hovering your camera around it. You can always tap to gather more context. Increases mobile data usage.</Text>
                }
            </Animated.View>

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
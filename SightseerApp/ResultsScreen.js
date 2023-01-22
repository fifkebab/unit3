import { Button, Pressable, Settings, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ChevronRight, Restart, Focus, Ear } from './images';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

export const speakVoice = async(type = "long", force = false, item) => {
    // This gets the settings from the async storage;
    const SettingsWorker = JSON.parse(await AsyncStorage.getItem('Settings'));
    var speech;

    // This will stop any currently playing speech;
    Speech.stop();

    // Depending what context is provided, speech will be formed differently;
    if (type == "long") speech = `The current item is ${item}.`
    if (type == "short") speech = `${item}.`

    if (!force)  {
        // If the user has read aloud enabled, it will speak the speech variable;
        // Otherwise, it will not speak;
        if (SettingsWorker["read-aloud"] == false) return;
        if (SettingsWorker["read-aloud"] == true) Speech.speak(speech);
    } else {
        // Regardless of the user's settings, it will speak the speech variable;
        Speech.speak(speech);
    }
}

export const ResutsScreen = ({navigation, route}) => {
    var parameters = route.params;
    console.log(parameters)

    const [itemNumber, setItemNumber] = useState(0);
    const [currentItem, setCurrentItem] = useState(parameters.imageResults[0]);
    const [SettingsWorker, setSettings] = useState({});
    const [readAloud, setReadAloud] = useState(false);

    const SettingsRead = async(camRef = null) => {
        const settings = JSON.parse(await AsyncStorage.getItem('Settings'));
        setSettings(settings);
        return settings;
    }

    const styles = StyleSheet.create({
        image: {
            // flex: 1,
            width: "100%",
            height: "100%",
            resizeMode: 'stretch',
        },
        button: {
            backgroundColor: `rgba(0, 0, 0, ${SettingsWorker['transparency'] ? 0.5 : 1})`,
            padding: 20,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 2.5,
            marginTop: 2.5,
            borderRadius: 22,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        uiFront: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
        },
        darkBackplate: {
            backgroundColor: `rgba(0, 0, 0, ${SettingsWorker['transparency'] ? 0.5 : 1})`,
            padding: 20,
            margin: 10,
            borderRadius: 22
        },
        largeText: {
            fontSize: 30,
            fontWeight: "bold",
            color: "white"
        },
        buttonText: {
            fontWeight: "bold",
            color: "white",
            fontSize: 18,
            marginStart: 20
        }
    })

    const dictionary = {};

    const downloadDefinition = async(item) => {
        const itemcurr = currentItem;
        if (dictionary[itemcurr.name] == undefined) {
            console.log("Downloading definition");
            const definitionRequest = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentItem.name}`)
            const data = await definitionRequest.json();

            dictionary[itemcurr.name] = data[0].meanings[0].definitions[0].definition;
        }
        console.log(dictionary);
    }

    const incrementItemNumber = (increaseUnitNumber) => {
        var newNumber = itemNumber + increaseUnitNumber;
        if (newNumber > parameters.imageResults.length - 1) {
            newNumber = 0;
        }
        setItemNumber(newNumber);
        setCurrentItem(parameters.imageResults[newNumber]);
        downloadDefinition(newNumber);
        // speakVoice();
    }

    useEffect(() => {
        SettingsRead();
    }, [])

    useEffect(() => {
        if (SettingsWorker["read-aloud"] == true) {
            setReadAloud(true);
        } else {
            setReadAloud(false);
        }
    }, [SettingsWorker])

    useEffect(() => {
        speakVoice("long", false, currentItem.name);
        downloadDefinition(itemNumber);
    }, [currentItem]);

    return (
        <View>
            <Image style={styles.image} source={{
                uri: parameters.photoUri,
                width: parameters.photoDimensions.width,
                height: parameters.photoDimensions.height
            }}>
            </Image>
            <View style={styles.uiFront}>
                    <View style={styles.darkBackplate}>
                        <Text style={styles.largeText}>{currentItem.name}</Text>
                        <Text style={{ color: "white", fontSize: 18 }}>{dictionary[currentItem.name]}</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => { incrementItemNumber(1) }}>
                            <ChevronRight stroke="white" strokeWidth={2.5}/>
                            <Text style={styles.buttonText}>Next item</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => { speakVoice("short", true, currentItem.name) }}>
                            {readAloud && 
                            <Restart stroke="white" strokeWidth={2.5}/>}
                            {readAloud && 
                            <Text style={styles.buttonText} >Read out again</Text>}

                            {!readAloud &&
                            <Ear stroke="white" strokeWidth={2.5}/>}

                            {!readAloud &&
                            <Text style={styles.buttonText} >Read aloud</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => {
                            navigation.pop()
                        }}>
                            <Focus stroke="white" strokeWidth={2.5}/>
                            <Text style={styles.buttonText}>Scan another</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}

const resultScreenStyle = StyleSheet.create({
    mainView: {
        flex: 1,

    }
})
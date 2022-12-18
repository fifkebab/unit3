import { Button, Pressable, Settings, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ChevronRight, Restart, Focus } from './images';
import Tts from 'react-native-tts';
import { useEffect, useState } from 'react';

export const ResutsScreen = ({navigation, route}) => {
    const parameters = route.params;
    console.log(parameters)

    // if (parameters == undefined) {
    //     this.props.navigation.pop()
    //     alert("That didn't work, try again.");
    // }
    const [itemNumber, setItemNumber] = useState(0);
    const [currentItem, setCurrentItem] = useState(parameters.imageResults[0]);

    const downloadDefinition = async(item) => {
        
        if (currentItem.definition == undefined) {
            console.log("Downloading definition");
            const definitionRequest = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentItem.name}`)
            const data = await definitionRequest.json();

            const newImageResults = parameters.imageResults[item];
            newImageResults.definition = data[0].meanings[0].definitions[0].definition;

            setCurrentItem(newImageResults)
            this.forceUpdate();
        }
    }

    const incrementItemNumber = (increaseUnitNumber) => {
        const newNumber = itemNumber + increaseUnitNumber;
        setItemNumber(newNumber);
        setCurrentItem(parameters.imageResults[newNumber]);
        downloadDefinition(newNumber);
        // speakVoice();
    }

    const speakVoice = () => {
        Tts.speak(`The current item is ${currentItem.name}.`);
    }

    useEffect(() => {
        // speakVoice();
        downloadDefinition(0);
    }, []);
    

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
                        <Text style={{ color: "white", fontSize: 18 }}>{currentItem.definition}</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => { incrementItemNumber(1) }}>
                            <ChevronRight stroke="white" strokeWidth={2.5}/>
                            <Text style={styles.buttonText}>Next item</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Restart stroke="white" strokeWidth={2.5}/>
                            <Text style={styles.buttonText}>Read out again</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
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

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'stretch',
    },
    button: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
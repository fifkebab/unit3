import { bindHost } from "../App";
import { speakVoice } from "../ResultsScreen";
import * as ImageManipulator from 'expo-image-manipulator';

export const startScan = async(cameraRef, setScanText, navigation) => {
    console.log("Scanning...");
    setScanText("Scanning...");

    
    cameraRef.takePictureAsync({ onPictureSaved: async(photo) => {
        console.log("Picture saved!");
        const imageResults = await sendImage(photo);

        if (!imageResults.captive) {
            setScanText("No internet connection.")
        } else {
            if (!imageResults.items) {
                setScanText("Nothing here");
            } else {
                setScanText("Scan complete!");

                for (const item of imageResults.items) {
                    const query = item.name

                    const searchImageReq = await fetch(bindHost(`/image/search?query=${query}`));
                    const searchImageData = await searchImageReq.text();

                    item["image"] = searchImageData;


                    const definitionRequest = await fetch(`https://en.wikipedia.org/w/api.php?titles=${query}&action=query&prop=extracts&explaintext&format=json`)
                    const definitionRequestData = await definitionRequest.json();

                    item["definition"] = definitionRequestData.query.pages[Object.keys(definitionRequestData.query.pages)[0]].extract.split(".")[0];
                    if (item["definition"].trim() == "") item["definition"] = "No definition found."

                    item["name"] = definitionRequestData.query.pages[Object.keys(definitionRequestData.query.pages)[0]].title
                }

                navigation.navigate("Results", {
                    photoUri: photo.uri,
                    photoDimensions: {
                        width: photo.width,
                        height: photo.height
                    },
                    imageResults: imageResults.items
                })
            }
        }
    }});
}


export const automaticScan = (cameraRef, setScanText) => {
    // Take a photo of the viewfinder
    cameraRef.takePictureAsync({ onPictureSaved: async(photo) => {
        console.log("Picture saved!");

        // Resize the photo to 360x480 for better performance (automatic only)
        const manipResult = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ resize: { width: 360, height: 480 } }],
            { format: 'jpeg' }
            );
        console.log("Picture manipulated!");

        // Send the photo to the server
        const imageResults = await sendImage(manipResult);

        if (!imageResults.captive) {
            // If there's no internet connection, display an error message, this is because the image results are false
            setScanText("No internet connection.")
        } else {
            // Display the results, and get only the names of the items
            // Speak the names of the items
            if (!imageResults.items) {
                setScanText("Nothing found here");
                speakVoice("short", false, "Nothing found here");
            } else {
                const namesOnly = imageResults.items.map((item) => item.name);
                setScanText(namesOnly.join(", "));
                speakVoice("short", false, namesOnly.join(", "));
            }
        }
        setTimeout(() => {
            // Repeat the process every 2 seconds
            automaticScan(cameraRef, setScanText);
        }, 2000);
    }});
}


const sendImage = async (image) => {
    // Check if the user is connected to the internet and not behind a captive portal
    const captiveCheck = await fetch(bindHost("/"));
    const captiveData = await captiveCheck.text();

    console.log(captiveData)

    if (captiveData != "Pong") {
        // If the result isn't the same, the connection isn't secure, and the user is probably behind a captive portal
        alert("Connect to the internet and try again.");
        // Do not continue, it is unsafe
        return {
            captive: false,
            response: false,
            items: false
        };
    }

    // Create a new formdata object
    let formdata = new FormData();
    // Add the image to the formdata object
    formdata.append("file", { uri: image.uri, name: "image.jpg", type: "image/jpg" });

    // Start a new POST request to the server (REST API)
    const request = await fetch(bindHost("/scan"), {
        method: 'POST',
        body: formdata,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    // If the request is successful, return the results
    if (request.status == 200) {
        // Convert the results to a more readable format
        const data = await request.json();

        // Convert the data to a more managable format
        var newFormat = [];
    
        if (Object.keys(data.class).length == 0) {
            return {
                captive: true,
                response: true,
                items: false
            }
        }

        Object.keys(data.class).forEach((item, index) => {
            newFormat.push({
                "class": data.class[index],
                "name": data.name[index],
                "xmin": data.xmin[index],
                "ymin": data.ymin[index],
                "xmax": data.xmax[index],
                "ymax": data.ymax[index],
                "confidence": data.confidence[index],
                "definition": undefined
            })
        })

        // Return the results
        return {
            captive: true,
            response: true,
            items: newFormat
        }
    } else {
        return {
            captive: true,
            response: false,
            items: false
        }
    }
}
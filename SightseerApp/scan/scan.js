import { Host } from "../App";

export const startScan = async(cameraRef, setScanText, navigation) => {
    console.log("Scanning...");
    setScanText("Scanning...");
    cameraRef.takePictureAsync({ onPictureSaved: async(photo) => {
        console.log("Picture saved!");
        const imageResults = await sendImage(photo);

        if (imageResults == false) {
            setScanText("No internet connection.")
        } else {
            setScanText("Scan complete!");
            navigation.navigate("Results", {
                photoUri: photo.uri,
                photoDimensions: {
                    width: photo.width,
                    height: photo.height
                },
                imageResults: imageResults
            })
        }
    }});
}


export const automaticScan = (cameraRef, setScanText) => {
    setScanText("Scanning automatically...");
}


const sendImage = async (image) => {
    const captiveCheck = await fetch(`${Host}/`);
    const captiveData = await captiveCheck.text();

    if (captiveData != "Pong") {
        alert("Connect to the internet and try again.");
        return false;
    }

    let formdata = new FormData();
    formdata.append("file", { uri: image.uri, name: "image.jpg", type: "image/jpg" });

    const request = await fetch(`${Host}/scan`, {
        method: 'POST',
        body: formdata,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    if (request.status == 200) {
        const data = await request.json();
        var newFormat = [];
        // console.log(data);
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

        return newFormat
    }
}
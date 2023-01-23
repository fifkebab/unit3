import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, Pressable, Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { LinearGradient } from 'expo-linear-gradient';
import { automaticScan, startScan } from './scan/scan'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


export default function CameraScreen({navigation}) {
  // Set hooks
  const [type, setType] = useState(CameraType.back);
  // Check if user has granted camera permissions, and request if not
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // Set instruction text
  const [statusText, setStatusText] = useState("Tap anywhere to scan");
  // Create settings hook
  const [SettingsWorker, setSettings] = useState({});
  // Create result hook for scan automatically
  const [result, setResult] = useState({});
  // Create camera hook for reference later
  const [camera, setCamera] = useState(null);
  // Create last camera hook for reference later
  const [lastCamera, setLastCamera] = useState(null);
  // See if screen is active
  const isFocused = useIsFocused();
  // var camera;

  // Function to intialise and load settings
  const SettingsRead = (camRef = null) => {
    AsyncStorage.getItem('Settings').then(async(value) => {
      // Set the local settings from local storage.
      setSettings(JSON.parse(value));
      const localSettings = JSON.parse(value);

      // Check if the camera is initialized
      if (camera != null) {
        // Check if the user has enabled automatic scanning
        if (localSettings["scan-automatically"] == true) {
          // Set the instruction text to notify the user that scanning is happening automatically
          setStatusText("Scanning automatically. Tap for more context");
          // Start the automatic scan
          automaticScan(camRef, setStatusText);
        }
      }
    })
  }

  // Style for this screen
  const bottomBar = StyleSheet.create({
    container: {
      bottom: 0,
      height: 100,
      backgroundColor: SettingsWorker["transparency"] ? "transparent" : "black",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    barText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 20,
    },
    smallText: {
      fontSize: 14,
      color: "white",
      textAlign: 'center',
    }
  })
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      width: 150,
      backgroundColor: 'transparent',
      marginStart: 15,
    },
    settingsButton: {
      flex: 1,
      alignSelf: 'flex-start',
      alignItems: 'center',
      // Responds to the user's setting for transparency
      backgroundColor: `rgba(0,0,0,${SettingsWorker['transparency'] ? 0.5 : 1})`,
      padding: 10,
      borderRadius: 10,
      marginTop: (statusBarHeight + 20)
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    }
  });

  // Run once when screen loaded
  useEffect(() => {
      // Load settings
      SettingsRead();
  }, [])

  useEffect(() => {
    // When camera has changed (just loaded in)
    if (camera != lastCamera) {
      // Assume camera is loaded and set Hooks.
      setLastCamera(camera);
      // Reinitialise settings incase changed
      SettingsRead(camera);
    }
  }, [camera]);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Sightseer requires the camera in order to see the environment around you.</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // Unused function, to toggle between front and back camera
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  

  return (
    <View style={styles.container}>
      {/* <BlurView style={styles.statusBarBlur} blurType="light" blurAmount={8} /> */}
      <Pressable 

      style={styles.container}
      onPress={() => {
        startScan(camera, setStatusText, navigation);
      }}>
        {isFocused && <Camera 
          style={styles.camera} 
          type={type} 
          ref={(ref) => { setCamera(ref); }} 
          >

          {/* Settings Button */}
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.settingsButton} onPress={() => { navigation.navigate("Settings") }}>
                <Text style={styles.text}>Settings</Text>
              </TouchableOpacity>
          </View>

          <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} style={bottomBar.container}>
            <View>
              <Text style={bottomBar.barText}>{statusText}</Text>
            </View>
          </LinearGradient>

          <View>

          </View>
        </Camera>}  
      </Pressable>
    </View>
  );
}


const statusBarHeight = getStatusBarHeight();

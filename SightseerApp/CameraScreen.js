import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, Pressable, Settings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { LinearGradient } from 'expo-linear-gradient';
import { automaticScan, startScan } from './scan/scan'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


export default function CameraScreen({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [statusText, setStatusText] = useState("Tap anywhere to scan");
  const [SettingsWorker, setSettings] = useState({});
  const [result, setResult] = useState({});
  const [camera, setCamera] = useState(null);
  const [lastCamera, setLastCamera] = useState(null);
  const isFocused = useIsFocused();
  // var camera;

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

  const bottomBar = StyleSheet.create({
    container: {
      bottom: 0,
      height: 100,
    },
    barText: {
      // here
      textAlign: 'center',
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold'
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
      backgroundColor: `rgba(0,0,0,${SettingsWorker['transparency'] ? 0.5 : 1})`,
      padding: 10,
      borderRadius: 10,
      marginTop: (statusBarHeight + 20)
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    statusBarBlur: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: statusBarHeight,
    }
  });


  useEffect(() => {
      SettingsRead();
  }, [])

  useEffect(() => {
    // When camera has been changed
    if (camera != lastCamera) {
      // When camera is initialized
      setLastCamera(camera);
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
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.settingsButton} onPress={() => { navigation.navigate("Settings") }}>
                <Text style={styles.text}>Settings</Text>
              </TouchableOpacity>
          </View>

          <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} style={bottomBar.container}>
            <View>
              <Text style={bottomBar.barText}>{statusText}</Text>

              {SettingsWorker["scan-automatically"] && 
              <Text style={bottomBar.smallText}>Tap to gather more context</Text>}

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

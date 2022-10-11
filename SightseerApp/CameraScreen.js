import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { LinearGradient } from 'expo-linear-gradient';



export default function CameraScreen({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
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
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.settingsButton} onPress={() => { navigation.navigate("Settings") }}>
              <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
        </View>

        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} style={bottomBar.container}>
            <Text style={bottomBar.barText}>Tap anywhere to scan</Text>
        </LinearGradient>
      </Camera>
    </View>
  );
}


const statusBarHeight = getStatusBarHeight();

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
    backgroundColor: 'rgba(0,0,0,0.5)',
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

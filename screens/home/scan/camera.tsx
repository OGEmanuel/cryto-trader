import { launchCameraAsync } from 'expo-image-picker';
// import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraView } from 'expo-camera';
import { useEffect, useRef } from 'react';
import { AppState, Linking, StyleSheet, View } from 'react-native';
import BottomLeftIcon from './assets/icons/bottom-left';
import BottomRightIcon from './assets/icons/bottom-right';
import TopLeftIcon from './assets/icons/top-left';
import TopRightIcon from './assets/icons/top-right';

const Camera = () => {
  const takeImageHandler = async () => {
    const image = await launchCameraAsync();
    console.log(image);
  };

  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View className="relative h-[26.8125rem] w-full items-center justify-center overflow-hidden bg-background-2 active:opacity-75">
      <View className="absolute left-0 top-0 z-20">
        <TopLeftIcon />
      </View>
      <View className="absolute right-0 top-0 z-20">
        <TopRightIcon />
      </View>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              await Linking.openURL(data);
            }, 500);
          }
        }}
      />
      <View className="absolute bottom-0 left-0">
        <BottomLeftIcon />
      </View>
      <View className="absolute bottom-0 right-0">
        <BottomRightIcon />
      </View>
    </View>
  );
};

export default Camera;

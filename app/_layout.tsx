import { useFonts } from 'expo-font';

import { Colors } from '@/constants/theme';
import '@/global.css';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'NeueMontreal-Light': require('../assets/fonts/NeueMontreal-Light.otf'),
    NeueMontreal: require('../assets/fonts/NeueMontreal-Regular.otf'),
    'NeueMontreal-Medium': require('../assets/fonts/NeueMontreal-Medium.otf'),
    'NeueMontreal-Bold': require('../assets/fonts/NeueMontreal-Bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <View className="flex-1 bg-background">
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: Colors.light.background,
            },
            headerShown: false,
          }}
        />
      </View>
    </>
  );
}

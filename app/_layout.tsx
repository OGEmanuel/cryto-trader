import { useFonts } from 'expo-font';

import { Colors } from '@/constants/theme';
import '@/global.css';
import { store } from '@/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

export default function RootLayout() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem('isOnboarded');
      setIsOnboarded(!!onboarded);
    };

    checkOnboarding();
  }, []);

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

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <View className="flex-1 bg-background">
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: Colors.light.background,
            },
            headerShown: false,
          }}
        >
          <Stack.Protected guard={isOnboarded ? false : true}>
            <Stack.Screen
              name={'(onboarding)/index'}
              options={{
                title: 'Onboarding',
              }}
            />
          </Stack.Protected>
          <Stack.Screen
            name={'auth/index'}
            options={{
              title: 'Auth',
            }}
          />
          <Stack.Screen
            name={'home'}
            options={{
              title: 'Home',
            }}
          />
        </Stack>
        <Toast />
      </View>
    </Provider>
  );
}

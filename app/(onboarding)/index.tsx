import OnboardingScreen from '@/screens/onboarding';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <OnboardingScreen />
    </>
  );
}

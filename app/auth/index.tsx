import AuthScreen from '@/screens/auth';
import { Stack } from 'expo-router';

const Auth = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <AuthScreen />
    </>
  );
};

export default Auth;

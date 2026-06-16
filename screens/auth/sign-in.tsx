import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import { useLoginMutation, useRefreshMutation } from '@/services/auth';
import { revalidateLogic } from '@tanstack/react-form';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import z from 'zod';
import FacebookIcon from './assets/icons/facebook-icon.svg';
import FingerprintIcon from './assets/icons/fingerprint-icon.svg';
import GoogleIcon from './assets/icons/google-icon.svg';
import PageWrapper from './components/tab-wrapper';
import { setChallengeIDValue } from './store/challenge-store';

const emailSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { error: 'Password should be at least 8 characters long' }),
});

type formSchemaType = z.infer<typeof emailSchema>;

const SignIn = (props: { onOpenBottomSheet: () => void }) => {
  const { onOpenBottomSheet } = props;
  const [isRefreshAvailable, setIsRefreshAvailable] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [securePassword, setSecurePassword] = useState(true);

  const [login, { isLoading }] = useLoginMutation();
  const [refresh, { isLoading: isRefreshing }] = useRefreshMutation();

  useEffect(() => {
    const handleCheckRefresh = async () => {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      setIsRefreshAvailable(Boolean(refreshToken));
    };

    handleCheckRefresh();
  }, []);

  const handleRefresh = async (values: { refreshToken: string }) => {
    try {
      const response = await refresh(values).unwrap();

      await SecureStore.setItemAsync('accessToken', response.data.accessToken);

      await SecureStore.setItemAsync(
        'refreshToken',
        response.data.refreshToken,
      );

      await SecureStore.setItemAsync('expiresAt', response.data.expiresAt);

      router.replace('/home');
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Login failed!',
        text2: message,
      });
    }
  };

  const handleLogin = async (values: {
    loginType: 'email';
    identifier: string;
    password: string;
  }) => {
    try {
      const response = await login(values).unwrap();

      if ('challengeId' in response.data) {
        onOpenBottomSheet();
        dispatch(setChallengeIDValue(response.data.challengeId));
      } else {
        await SecureStore.setItemAsync(
          'accessToken',
          response.data.accessToken,
        );

        await SecureStore.setItemAsync(
          'refreshToken',
          response.data.refreshToken,
        );
        await SecureStore.setItemAsync('expiresAt', response.data.expiresAt);

        router.replace('/home');
      }
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Login failed!',
        text2: message,
      });
    }
  };

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    } as formSchemaType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: emailSchema,
    },
    onSubmit: ({ value }) => {
      handleLogin({
        identifier: value.email,
        loginType: 'email',
        password: value.password,
      });
    },
  });

  const fallbackToDefaultAuth = () => {
    Toast.show({
      type: 'error',
      text1: 'Biometric not supported or not found',
      text2: 'Please sign in with your details',
    });
  };

  const handleBiometricAuth = async () => {
    try {
      // Check if device supports biometrics
      const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();

      if (!hasBiometricHardware) {
        fallbackToDefaultAuth();
        return;
      }

      // Check if user has enrolled biometrics
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isBiometricEnrolled) {
        fallbackToDefaultAuth();
        return;
      }

      // Authenticate user
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sign in with Fingerprint',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });

      if (!biometricAuth.success) {
        return;
      }

      // Retrieve refresh token
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (!refreshToken) {
        fallbackToDefaultAuth();
        return;
      }

      // Refresh session
      await handleRefresh({
        refreshToken,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Authentication failed',
        text2: 'Please try again',
      });
    }
  };

  return (
    <PageWrapper title="Sign in">
      <View className="gap-[3.4375rem]">
        <View className="gap-10">
          <View className="gap-[1.875rem]">
            <form.AppField name="email">
              {field => (
                <field.TextField
                  inputLabel="Email"
                  inputProps={{
                    placeholder: 'Enter your email',
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    textContentType: 'emailAddress',
                    autoComplete: 'email',
                  }}
                />
              )}
            </form.AppField>
            <View className="gap-2">
              <form.AppField name="password">
                {field => (
                  <field.TextField
                    inputLabel="Password"
                    inputProps={{
                      placeholder: 'Enter your password',
                      secureTextEntry: securePassword,
                      autoCapitalize: 'none',
                      autoCorrect: false,
                      textContentType: 'password',
                      autoComplete: 'password',
                    }}
                    onPasswordViewToggle={() =>
                      setSecurePassword(!securePassword)
                    }
                  />
                )}
              </form.AppField>
              <TextCustom className="leading-[100%] text-primary">
                Forgot password?
              </TextCustom>
            </View>
          </View>
          <View className="gap-5">
            <form.AppForm>
              <form.SubscribeButton
                onPress={form._handleSubmit}
                isPending={isLoading || isRefreshing}
                label={'Sign in'}
              />
            </form.AppForm>
            <View className="flex-row items-center gap-2">
              <View className="flex-1 border-[0.5px] border-secondary" />
              <TextCustom className="text-sm/[100%] text-secondary">
                Or login with
              </TextCustom>
              <View className="flex-1 border-[0.5px] border-secondary" />
            </View>
            <View className="flex-row items-center gap-5">
              <Pressable className="h-[3.375rem] flex-1 flex-row items-center justify-center gap-[10px] rounded-2xl bg-white active:opacity-75">
                <FacebookIcon />
                <TextCustom className="text-lg/[100%] text-background">
                  Facebook
                </TextCustom>
              </Pressable>
              <Pressable className="h-[3.375rem] flex-1 flex-row items-center justify-center gap-[10px] rounded-2xl bg-white active:opacity-75">
                <GoogleIcon />
                <TextCustom className="text-lg/[100%] text-background">
                  Google
                </TextCustom>
              </Pressable>
            </View>
          </View>
        </View>
        {isRefreshAvailable && (
          <View className="flex-row justify-center">
            <Pressable
              onPress={handleBiometricAuth}
              className="items-center gap-5 active:opacity-75"
            >
              <FingerprintIcon />
              <TextCustom className="text-sm/[100%] text-custom-text-2">
                Use fingerprint instead?
              </TextCustom>
            </Pressable>
          </View>
        )}
      </View>
    </PageWrapper>
  );
};

export default SignIn;

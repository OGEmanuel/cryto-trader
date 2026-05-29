import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import { useRequestOtpMutation, useVerifyOtpMutation } from '@/services/auth';
import { revalidateLogic } from '@tanstack/react-form';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import z from 'zod';
import RegistrationWrapper from '../components/registration-wrapper';

const formSchema = z.object({
  otp: z.string().min(6, {
    error: 'OTP should be 6 numbers long',
  }),
});

const INITIAL_SEC = 30;

const VerificationScreen = () => {
  const params = useLocalSearchParams<{ email: string; seconds: string }>();
  const router = useRouter();

  const [request, { isLoading: isRequesting }] = useRequestOtpMutation();
  const [verify, { isLoading }] = useVerifyOtpMutation();

  const [count, setCount] = useState(INITIAL_SEC);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  const handleVerify = async (values: { email: string; code: string }) => {
    try {
      await verify(values).unwrap();

      router.replace('/auth/success');
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        text2: message,
      });
    }
  };

  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = async () => {
    try {
      const response = await request({
        email: params.email,
      });

      Alert.alert(
        'OTP Sent!',
        `Please copy this code ${response.data?.data.demoCode} for user verification`,
        [
          {
            text: 'Copy',
            style: 'default',
            onPress: () => {
              (copyToClipboard(`${response.data?.data.demoCode}`),
                Toast.show({
                  type: 'success',
                  text1: 'Code copied!',
                }));
            },
          },
        ],
      );

      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setCount(INITIAL_SEC);
      start();
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'OTP Request failed! Please try again',
        text2: message,
      });
    }
  };

  useEffect(() => {
    start();
    return () => clearInterval(intervalRef.current!);
  }, []);

  const form = useAppForm({
    defaultValues: {
      otp: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      handleVerify({
        email: params.email,
        code: value.otp,
      });
    },
  });

  return (
    <RegistrationWrapper title="Verification">
      <View className="gap-10">
        <View className="gap-5">
          <TextCustom className="font-nm-bold text-[2rem]/[2.875rem] text-white">
            Enter your code
          </TextCustom>
          <View className="gap-1">
            <TextCustom className="text-sm/[100%] text-custom-text">
              Please type the code we sent to
            </TextCustom>
            <TextCustom className="text-sm/[100%] text-primary">
              {params.email}
            </TextCustom>
          </View>
        </View>
        <View className="gap-[3.4375rem]">
          <View className="gap-5">
            <form.AppField name="otp">
              {field => <field.OTPField />}
            </form.AppField>
            <View className="h-10 items-center gap-1">
              {count > 0 ? (
                <TextCustom className="text-sm/[100%] text-custom-text-2">
                  Resend code ({`${count}`})
                </TextCustom>
              ) : (
                <Pressable
                  onPress={() => reset()}
                  disabled={isRequesting}
                  className="active:opacity-75"
                >
                  {isRequesting ? (
                    <ActivityIndicator />
                  ) : (
                    <TextCustom className="text-sm/[100%] text-primary">
                      Resend Link
                    </TextCustom>
                  )}
                </Pressable>
              )}
            </View>
          </View>
          <form.AppForm>
            <form.SubscribeButton
              onPress={form._handleSubmit}
              isPending={isLoading}
              label={'Continue'}
            />
          </form.AppForm>
        </View>
      </View>
    </RegistrationWrapper>
  );
};

export default VerificationScreen;

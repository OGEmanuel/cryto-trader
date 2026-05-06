import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import { revalidateLogic } from '@tanstack/react-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import z from 'zod';
import RegistrationWrapper from '../components/registration-wrapper';
import { formatPhoneNumber } from '../lib/utils';

const formSchema = z.object({
  otp: z.string().min(4, {
    error: 'OTP should be 4 numbers long',
  }),
});

const INITIAL = 30;

const VerificationScreen = () => {
  const params = useLocalSearchParams<{ mobileNumber: string }>();
  const router = useRouter();

  const [count, setCount] = useState(INITIAL);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const reset = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setCount(INITIAL);
    start();
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
      console.log(value);
      router.replace('/auth/success');
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
              {formatPhoneNumber(params.mobileNumber)}
            </TextCustom>
          </View>
        </View>
        <View className="gap-[3.4375rem]">
          <View className="gap-5">
            <form.AppField name="otp">
              {field => <field.OTPField />}
            </form.AppField>
            <View className="items-center gap-1">
              {count > 0 ? (
                <TextCustom className="text-custom-text-2 text-sm/[100%]">
                  Resend code ({`${count}`})
                </TextCustom>
              ) : (
                <Pressable
                  onPress={() => reset()}
                  className="active:opacity-75"
                >
                  <TextCustom className="text-sm/[100%] text-primary">
                    Resend Link
                  </TextCustom>
                </Pressable>
              )}
            </View>
          </View>
          <form.AppForm>
            <form.SubscribeButton
              onPress={form._handleSubmit}
              isPending={false}
              label={'Continue'}
            />
          </form.AppForm>
        </View>
      </View>
    </RegistrationWrapper>
  );
};

export default VerificationScreen;

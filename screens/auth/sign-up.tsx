import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import {
  RegisterType,
  useRegisterMutation,
  useRequestOtpMutation,
} from '@/services/auth';
import { revalidateLogic } from '@tanstack/react-form';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import z from 'zod';
import FacebookIcon from './assets/icons/facebook-icon.svg';
import GoogleIcon from './assets/icons/google-icon.svg';
import PageWrapper from './components/tab-wrapper';

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: 'First name is required with at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { error: 'Last name is required with at least 2 characters' }),
  email: z.email({ error: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    error: 'Please enter a valid phone number.',
  }),
  password: z
    .string()
    .min(8, { error: 'Password should be at least 8 characters long' }),
});

type formSchemaType = z.infer<typeof formSchema>;

const SignUp = () => {
  const [securePassword, setSecurePassword] = useState(true);
  const router = useRouter();
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const [request, { isLoading: isRequesting }] = useRequestOtpMutation();

  const handleRegister = async (values: RegisterType) => {
    try {
      await register(values).unwrap();

      try {
        const response = await request({
          email: values.email,
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
                  }),
                  router.push({
                    pathname: '/auth/verification',
                    params: {
                      email: values.email,
                      seconds: response.data?.data.expiresInSeconds,
                    },
                  }));
              },
            },
          ],
        );
      } catch (err: any) {
        const message = err?.data?.error.message || 'Something went wrong';

        Toast.show({
          type: 'error',
          text1: 'OTP Request failed! Please try again',
          text2: message,
        });
      }
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        text2: message,
      });
    }
  };

  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    } as formSchemaType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      handleRegister({
        fullName: `${value.firstName} ${value.lastName}`,
        email: value.email,
        password: value.password,
        phone: value.phone,
      });
    },
  });

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-grow">
      <PageWrapper title="Sign up">
        <View className="gap-[1.875rem]">
          <form.AppField name="firstName">
            {field => (
              <field.TextField
                inputLabel="First Name"
                inputProps={{
                  placeholder: 'First name',
                  autoCapitalize: 'words',
                  autoCorrect: false,
                  textContentType: 'givenName',
                  autoComplete: 'given-name',
                }}
              />
            )}
          </form.AppField>
          <form.AppField name="lastName">
            {field => (
              <field.TextField
                inputLabel="Last Name"
                inputProps={{
                  placeholder: 'Last name',
                  autoCapitalize: 'words',
                  autoCorrect: false,
                  textContentType: 'givenName',
                  autoComplete: 'given-name',
                }}
              />
            )}
          </form.AppField>
          <form.AppField name="email">
            {field => (
              <field.TextField
                inputLabel="Email"
                inputProps={{
                  placeholder: 'Please Enter your email',
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  textContentType: 'emailAddress',
                  autoComplete: 'email',
                }}
              />
            )}
          </form.AppField>
          <form.AppField name="phone">
            {field => (
              <field.TextField
                inputLabel="Phone"
                inputProps={{
                  placeholder: 'Enter your mobile',
                  keyboardType: 'phone-pad',
                  textContentType: 'telephoneNumber',
                  autoComplete: 'tel',
                  autoCorrect: false,
                }}
              />
            )}
          </form.AppField>
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
                onPasswordViewToggle={() => setSecurePassword(!securePassword)}
              />
            )}
          </form.AppField>
          <View className="gap-5">
            <form.AppForm>
              <form.SubscribeButton
                onPress={form._handleSubmit}
                isPending={isRegistering || isRequesting}
                label={'Sign up'}
              />
            </form.AppForm>
            <View className="flex-row items-center gap-2">
              <View className="flex-1 border-[0.5px] border-secondary" />
              <TextCustom className="text-sm/[100%] text-secondary">
                Or sign up with
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
      </PageWrapper>
    </ScrollView>
  );
};

export default SignUp;

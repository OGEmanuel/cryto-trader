import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import { revalidateLogic, useField } from '@tanstack/react-form';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import z from 'zod';
import FacebookIcon from '../assets/icons/facebook-icon.svg';
import GoogleIcon from '../assets/icons/google-icon.svg';

const emailSchema = z.object({
  authMode: z.literal('email'),
  email: z.email({ error: 'Please enter a valid email address.' }),
  mobileNumber: z.string().optional(),
  password: z
    .string()
    .min(8, { error: 'Password should be at least 8 characters long' }),
});

const mobileSchema = z.object({
  authMode: z.literal('mobile'),
  email: z.string().optional(),
  mobileNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    error: 'Please enter a valid phone number.',
  }),
  password: z
    .string()
    .min(8, { error: 'Password should be at least 8 characters long' }),
});

const formSchema = z.discriminatedUnion('authMode', [
  emailSchema,
  mobileSchema,
]);

type formSchemaType = z.infer<typeof formSchema>;

const AuthForm = (props: { page?: 'Sign up' }) => {
  const { page } = props;
  const [securePassword, setSecurePassword] = useState(true);

  const form = useAppForm({
    defaultValues: {
      authMode: 'email' as 'email' | 'mobile',
      email: '',
      mobileNumber: '',
      password: '',
    } as formSchemaType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const authModeSelector = useField({
    form,
    name: 'authMode',
  });

  const switchMode = (mode: 'email' | 'mobile') => {
    authModeSelector.setValue(mode);
  };

  return (
    <View className="gap-10">
      <View className="gap-[1.875rem]">
        {authModeSelector.state.value === 'email' ? (
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
                buttonLabel={
                  page ? 'Register with mobile' : 'Sign in with mobile'
                }
                onPress={() => switchMode('mobile')}
              />
            )}
          </form.AppField>
        ) : (
          <form.AppField name="mobileNumber">
            {field => (
              <field.TextField
                inputLabel="Mobile Number"
                inputProps={{
                  placeholder: 'Enter your mobile',
                  keyboardType: 'phone-pad',
                  textContentType: 'telephoneNumber',
                  autoComplete: 'tel',
                  autoCorrect: false,
                }}
                buttonLabel="Sign in with email"
                onPress={() => switchMode('email')}
              />
            )}
          </form.AppField>
        )}
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
                onPasswordViewToggle={() => setSecurePassword(!securePassword)}
              />
            )}
          </form.AppField>
          {!page && (
            <TextCustom className="leading-[100%] text-primary">
              Forgot password?
            </TextCustom>
          )}
        </View>
      </View>
      <View className="gap-5">
        <form.AppForm>
          <form.SubscribeButton
            onPress={form._handleSubmit}
            isPending={false}
            label={page ? 'Sign up' : 'Sign in'}
          />
        </form.AppForm>
        <View className="flex-row items-center gap-2">
          <View className="flex-1 border-[0.5px] border-secondary" />
          {page ? (
            <TextCustom className="text-sm/[100%] text-secondary">
              Or sign up with
            </TextCustom>
          ) : (
            <TextCustom className="text-sm/[100%] text-secondary">
              Or login with
            </TextCustom>
          )}
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
  );
};

export default AuthForm;

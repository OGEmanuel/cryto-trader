import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import { revalidateLogic } from '@tanstack/react-form';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import z from 'zod';
import RegistrationWrapper from '../components/registration-wrapper';

const formSchema = z.object({
  mobileNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    error: 'Please enter a valid phone number.',
  }),
});

const RegisterScreen = () => {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      mobileNumber: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      router.push({
        pathname: '/auth/verification',
        params: { mobileNumber: value.mobileNumber },
      });
    },
  });

  return (
    <RegistrationWrapper title="Sign Up">
      <View className="gap-[3.5625rem]">
        <View className="gap-1">
          <TextCustom className="font-nm-bold text-[2rem]/[2.875rem] text-white">
            Register with mobile
          </TextCustom>
          <TextCustom className="text-sm/[100%] text-custom-text">
            Please type your number, then we’ll send a verification code for
            authentication.
          </TextCustom>
        </View>
        <View className="gap-[3.75rem]">
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
              />
            )}
          </form.AppField>
          <form.AppForm>
            <form.SubscribeButton
              onPress={form._handleSubmit}
              isPending={false}
              label={'Send OTP'}
            />
          </form.AppForm>
        </View>
      </View>
    </RegistrationWrapper>
  );
};

export default RegisterScreen;

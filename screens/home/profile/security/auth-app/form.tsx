import { useAppForm } from '@/hooks/form';
import { useEnable2faMutation } from '@/services/auth';
import { useGetCurrentProfileQuery } from '@/services/profile';
import { revalidateLogic } from '@tanstack/react-form';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import z from 'zod';
import { setRecoveryValue } from '../store/recovery-store';

const formSchema = z.object({
  code: z.string().regex(/^\d{6}$/, { error: 'Code must be exactly 6 digits' }),
});

const AuthAppForm = (props: { onClose: () => void }) => {
  const { onClose } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { refetch } = useGetCurrentProfileQuery({});
  const [enable, { isLoading }] = useEnable2faMutation();

  const handleEnable2fa = async (value: { code: string }) => {
    try {
      const response = await enable(value).unwrap();
      dispatch(setRecoveryValue(response.data.recoveryCodes));
      form.reset();
      refetch();
      onClose();
      router.push('/home/profile/security/recovery-codes');
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Failed to enable 2fa, please try again!',
        text2: message,
      });
    }
  };

  const form = useAppForm({
    defaultValues: {
      code: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      handleEnable2fa(value);
    },
  });

  return (
    <View className="gap-6">
      <form.AppField name="code">
        {field => (
          <field.TextField
            inputLabel="Current Pin"
            inputProps={{
              placeholder: 'Enter your 6-digit PIN',
              keyboardType: 'number-pad',
              maxLength: 6,
              textContentType: 'oneTimeCode',
              autoCorrect: false,
              autoCapitalize: 'none',
              onChangeText: value =>
                field.handleChange(value.replace(/\D/g, '').slice(0, 6)),
            }}
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubscribeButton
          onPress={form._handleSubmit}
          isPending={isLoading}
          label={'Enable 2FA'}
        />
      </form.AppForm>
    </View>
  );
};

export default AuthAppForm;

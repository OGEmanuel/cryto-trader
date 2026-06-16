import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import { RootState } from '@/redux/store';
import { useVerify2faMutation } from '@/services/auth';
import { revalidateLogic, useField } from '@tanstack/react-form';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import z from 'zod';
import Tabs from '../tabs';

const VERIFY_PAGES = [
  { id: 1, name: 'Auth App Code' },
  { id: 2, name: 'Recovery Code' },
];

const authAppSchema = z.object({
  authMode: z.literal('authApp'),
  authAppCode: z
    .string()
    .regex(/^\d{6}$/, { error: 'Code must be exactly 6 digits' }),
  recoveryCode: z.string().optional(),
});

const recoverySchema = z.object({
  authMode: z.literal('recovery'),
  authAppCode: z.string().optional(),
  recoveryCode: z.string().length(11, { error: 'Invalid Recovery Code' }),
});

const formSchema = z.discriminatedUnion('authMode', [
  authAppSchema,
  recoverySchema,
]);

type FormSchemaType = z.infer<typeof formSchema>;

const BottomSheetContent = (props: { bottomSheetClose: () => void }) => {
  const [page, setPage] = useState(0);
  const { bottomSheetClose } = props;
  const router = useRouter();
  const challengeId = useSelector(
    (state: RootState) => state.challengeId.value,
  );

  const [verify, { isLoading }] = useVerify2faMutation();

  const handleVerify = async (values: {
    challengeId: string;
    code: string;
    recoveryCode: string;
  }) => {
    try {
      const response = await verify(values).unwrap();

      await SecureStore.setItemAsync('accessToken', response.data.accessToken);

      await SecureStore.setItemAsync(
        'refreshToken',
        response.data.refreshToken,
      );

      await SecureStore.setItemAsync('expiresAt', response.data.expiresAt);
      bottomSheetClose();
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

  const form = useAppForm({
    defaultValues: {
      authMode: 'authApp' as 'authApp' | 'recovery',
      authAppCode: '',
      recoveryCode: '',
    } as FormSchemaType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      if (page === 0) {
        handleVerify({
          challengeId,
          code: value.authAppCode!!,
          recoveryCode: '',
        });
      } else {
        handleVerify({
          challengeId,
          code: '',
          recoveryCode: value.recoveryCode!!,
        });
      }
    },
  });

  const authModeSelector = useField({
    form,
    name: 'authMode',
  });

  const switchMode = (mode: 'authApp' | 'recovery') => {
    authModeSelector.setValue(mode);
  };

  const goToPage = (page: number): void => {
    setPage(page);
    switchMode(page === 0 ? 'authApp' : 'recovery');
  };

  return (
    <View className="gap-10">
      <TextCustom className="font-nm-bold text-2xl/[130%] text-custom-extra">
        2FA Verification
      </TextCustom>
      <Tabs page={page} authPages={VERIFY_PAGES} onGoToPage={goToPage} />
      <View className="gap-6">
        {authModeSelector.state.value === 'authApp' && (
          <form.AppField name="authAppCode">
            {field => (
              <field.TextField
                inputLabel={'Auth App Code'}
                inputProps={{
                  placeholder: `Enter your Auth App code`,
                  textContentType: 'oneTimeCode',
                  keyboardType: 'number-pad',
                  maxLength: 6,
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  onChangeText: value =>
                    field.handleChange(value.replace(/\D/g, '').slice(0, 6)),
                }}
              />
            )}
          </form.AppField>
        )}
        {authModeSelector.state.value === 'recovery' && (
          <form.AppField name="recoveryCode">
            {field => (
              <field.TextField
                inputLabel={'Recovery Code'}
                inputProps={{
                  placeholder: 'Enter a recovery code',
                  keyboardType: 'twitter',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                }}
              />
            )}
          </form.AppField>
        )}
        <form.AppForm>
          <form.SubscribeButton
            onPress={form._handleSubmit}
            isPending={isLoading}
            label={'Login'}
          />
        </form.AppForm>
      </View>
    </View>
  );
};

export default BottomSheetContent;

import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import Tabs from '@/screens/auth/tabs';
import { useDisable2faMutation } from '@/services/auth';
import { useGetCurrentProfileQuery } from '@/services/profile';
import { revalidateLogic, useField } from '@tanstack/react-form';
import { useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import z from 'zod';

const VERIFY_PAGES = [
  { id: 1, name: 'Auth App Code' },
  { id: 2, name: 'Recovery Code' },
];

const authAppSchema = z.object({
  authMode: z.literal('authApp'),
  password: z
    .string()
    .min(8, { error: 'Password should be at least 8 characters long' }),
  authAppCode: z
    .string()
    .regex(/^\d{6}$/, { error: 'Code must be exactly 6 digits' }),
  recoveryCode: z.string().optional(),
});

const recoverySchema = z.object({
  authMode: z.literal('recovery'),
  password: z
    .string()
    .min(8, { error: 'Password should be at least 8 characters long' }),
  authAppCode: z.string().optional(),
  recoveryCode: z.string().length(11, { error: 'Invalid Recovery Code' }),
});

const formSchema = z.discriminatedUnion('authMode', [
  authAppSchema,
  recoverySchema,
]);

type FormSchemaType = z.infer<typeof formSchema>;

const Disable2fa = (props: { bottomSheetClose: () => void }) => {
  const [page, setPage] = useState(0);
  const [securePassword, setSecurePassword] = useState(true);
  const { bottomSheetClose } = props;
  const { refetch } = useGetCurrentProfileQuery({});

  const [disable, { isLoading }] = useDisable2faMutation();

  const handleDisable = async (values: {
    password: string;
    code: string;
    recoveryCode: string;
  }) => {
    try {
      await disable(values).unwrap();
      refetch();
      bottomSheetClose();
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Operation Failed!',
        text2: message,
      });
    }
  };

  const form = useAppForm({
    defaultValues: {
      authMode: 'authApp' as 'authApp' | 'recovery',
      password: '',
      authAppCode: '',
      recoveryCode: '',
    } as FormSchemaType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      if (page === 0) {
        handleDisable({
          password: value.password,
          code: value.authAppCode!!,
          recoveryCode: '',
        });
      } else {
        handleDisable({
          password: value.password,
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
        Disable 2FA
      </TextCustom>
      <Tabs page={page} authPages={VERIFY_PAGES} onGoToPage={goToPage} />
      <View className="gap-6">
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
            label={'Disable'}
          />
        </form.AppForm>
      </View>
    </View>
  );
};

export default Disable2fa;

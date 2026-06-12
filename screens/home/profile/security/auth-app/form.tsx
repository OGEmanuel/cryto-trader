import { useAppForm } from '@/hooks/form';
import { revalidateLogic } from '@tanstack/react-form';
import { View } from 'react-native';
import z from 'zod';

const formSchema = z.object({
  code: z.string().regex(/^\d{6}$/, { error: 'Code must be exactly 6 digits' }),
});

const AuthAppForm = (props: { onClose: () => void }) => {
  const { onClose } = props;

  const form = useAppForm({
    defaultValues: {
      code: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      onClose();
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
          // isPending={isLoading || isRefreshing}
          label={'Enable 2FA'}
        />
      </form.AppForm>
    </View>
  );
};

export default AuthAppForm;

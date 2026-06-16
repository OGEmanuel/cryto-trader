import { useAppForm } from '@/hooks/form';
import { useUpdatePinMutation } from '@/services/profile';
import { revalidateLogic } from '@tanstack/react-form';
import { useReducer } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import z from 'zod';

const formSchema = z
  .object({
    currentPin: z
      .string()
      .regex(/^\d{4}$/, { error: 'PIN must be exactly 4 digits' }),
    newPin: z
      .string()
      .regex(/^\d{4}$/, { error: 'PIN must be exactly 4 digits' }),

    confirmPin: z
      .string()
      .regex(/^\d{4}$/, { error: 'PIN must be exactly 4 digits' }),
  })
  .refine(data => data.newPin === data.confirmPin, {
    path: ['confirmPin'],
    error: 'PINs do not match',
  });

type PinField = 'currentPin' | 'newPin' | 'confirmPin';

type State = {
  currentPin: boolean;
  newPin: boolean;
  confirmPin: boolean;
};

type Action = {
  type: 'TOGGLE_PIN_VISIBILITY';
  payload: PinField;
};

const initialState: State = {
  currentPin: true,
  newPin: true,
  confirmPin: true,
};

function pinVisibilityReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_PIN_VISIBILITY':
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };

    default:
      return state;
  }
}

const TransactionPinForm = (props: { onClose: () => void }) => {
  const { onClose } = props;
  const [pinVisibility, dispatch] = useReducer(
    pinVisibilityReducer,
    initialState,
  );

  const [updatePin, { isLoading }] = useUpdatePinMutation();

  const handleUpdatePin = async (values: {
    currentPin: string;
    newPin: string;
  }) => {
    try {
      await updatePin(values).unwrap();

      Toast.show({
        type: 'success',
        text1: 'PIN Updated Successfully!',
      });

      form.reset();
      onClose();
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'PIN Update failed!',
        text2: message,
      });
    }
  };

  const form = useAppForm({
    defaultValues: {
      currentPin: '',
      newPin: '',
      confirmPin: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      handleUpdatePin({
        currentPin: value.currentPin,
        newPin: value.newPin,
      });
    },
  });

  return (
    <View className="gap-6">
      <form.AppField name="currentPin">
        {field => (
          <field.TextField
            inputLabel="Current Pin"
            inputProps={{
              placeholder: 'Enter your 4-digit PIN',
              secureTextEntry: pinVisibility.currentPin,
              keyboardType: 'number-pad',
              maxLength: 4,
              textContentType: 'oneTimeCode',
              autoCorrect: false,
              autoCapitalize: 'none',
              onChangeText: value =>
                field.handleChange(value.replace(/\D/g, '').slice(0, 4)),
            }}
            onPasswordViewToggle={() =>
              dispatch({
                type: 'TOGGLE_PIN_VISIBILITY',
                payload: 'currentPin',
              })
            }
          />
        )}
      </form.AppField>
      <form.AppField name="newPin">
        {field => (
          <field.TextField
            inputLabel="New Pin"
            inputProps={{
              placeholder: 'Enter your 4-digit PIN',
              secureTextEntry: pinVisibility.newPin,
              keyboardType: 'number-pad',
              maxLength: 4,
              textContentType: 'oneTimeCode',
              autoCorrect: false,
              autoCapitalize: 'none',
              onChangeText: value =>
                field.handleChange(value.replace(/\D/g, '').slice(0, 4)),
            }}
            onPasswordViewToggle={() =>
              dispatch({
                type: 'TOGGLE_PIN_VISIBILITY',
                payload: 'newPin',
              })
            }
          />
        )}
      </form.AppField>
      <form.AppField name="confirmPin">
        {field => (
          <field.TextField
            inputLabel="Confirm Pin"
            inputProps={{
              placeholder: 'Enter your 4-digit PIN',
              secureTextEntry: pinVisibility.confirmPin,
              keyboardType: 'number-pad',
              maxLength: 4,
              textContentType: 'oneTimeCode',
              autoCorrect: false,
              autoCapitalize: 'none',
              onChangeText: value =>
                field.handleChange(value.replace(/\D/g, '').slice(0, 4)),
            }}
            onPasswordViewToggle={() =>
              dispatch({
                type: 'TOGGLE_PIN_VISIBILITY',
                payload: 'confirmPin',
              })
            }
          />
        )}
      </form.AppField>
      <form.AppForm>
        <form.SubscribeButton
          onPress={form._handleSubmit}
          isPending={isLoading}
          label={'Update PIN'}
        />
      </form.AppForm>
    </View>
  );
};

export default TransactionPinForm;

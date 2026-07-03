import RevampedWrapper from '@/components/revamped-wrapper';
import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import {
  useExecuteTradeMutation,
  useGetQuoteDetailsQuery,
} from '@/services/trade';
import { revalidateLogic } from '@tanstack/react-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import z from 'zod';
import { setTransactionValue } from './store/transaction-store';

const formSchema = z.object({
  pin: z.string().length(4, {
    error: 'PIN should be 4 numbers long',
  }),
});

const ConfirmScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const [execute, { isLoading: isExecuting }] = useExecuteTradeMutation();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetQuoteDetailsQuery({
    quoteId: params.id,
  });

  const handleExecute = async (values: { quoteId: string; pin: string }) => {
    try {
      const response = await execute(values).unwrap();
      dispatch(setTransactionValue(response));
      router.push('/home/trades/status');
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: `Failed to confirm`,
        text2: message,
      });
    }
  };

  const form = useAppForm({
    defaultValues: {
      pin: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid: () => {
      Toast.show({
        type: 'error',
        text1: 'Invalid entry',
        text2: 'Pin should be 4 numbers long',
      });
    },
    onSubmit: ({ value }) => {
      handleExecute({
        quoteId: params.id,
        pin: value.pin,
      });
    },
  });

  return (
    <RevampedWrapper
      header="Confirm"
      description="Enter your transaction PIN to execute this quote."
      goBackTo={'/home/trades/buy'}
    >
      <View className="pt-12">
        <View className="gap-[52px]">
          <Skeleton.Group show={isLoading}>
            <View className="gap-3 rounded-[20px] bg-background-tertiary px-6 py-8">
              {/* Title */}
              <Skeleton width={100} height={18}>
                <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
                  Buy {data?.data.toAsset}
                </TextCustom>
              </Skeleton>

              {/* Swap amount */}
              <Skeleton width={220} height={14}>
                <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
                  {data?.data.fromAmount.toFixed(2)} {data?.data.fromAsset} →{' '}
                  {data?.data.toAmount.toFixed(4)} {data?.data.toAsset}
                </TextCustom>
              </Skeleton>

              {/* Fee */}
              <Skeleton width={120} height={14}>
                <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
                  Fee {data?.data.feeAmount} {data?.data.fromAsset}
                </TextCustom>
              </Skeleton>
            </View>
          </Skeleton.Group>
          <View className="gap-7">
            <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
              Transaction PIN
            </TextCustom>
            <View className="gap-56">
              <View className="items-center gap-[3.125rem]">
                <form.AppField name="pin">
                  {field => <field.OTPField shouldHideError OTP_LENGTH={4} />}
                </form.AppField>
              </View>
              <form.AppForm>
                <form.SubscribeButton
                  onPress={form._handleSubmit}
                  isPending={isExecuting}
                  label={'Execute trade'}
                />
              </form.AppForm>
            </View>
          </View>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default ConfirmScreen;

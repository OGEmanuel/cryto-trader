import RevampedWrapper from '@/components/revamped-wrapper';
import TextCustom from '@/components/ui/text';
import { useAppForm } from '@/hooks/form';
import { revalidateLogic } from '@tanstack/react-form';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import z from 'zod';

const formSchema = z.object({
  pin: z.string().length(4, {
    error: 'PIN should be 4 numbers long',
  }),
});

const ConfirmScreen = () => {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      pin: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      router.push('/home/trades/status');
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
          <View className="gap-3 rounded-[20px] bg-background-tertiary px-6 py-8">
            <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
              Buy BTC
            </TextCustom>
            <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
              250.00 USDT → 0.00384 BTC
            </TextCustom>
            <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
              Fee 2.50 USDT
            </TextCustom>
          </View>
          <View className="gap-7">
            <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
              Transaction PIN
            </TextCustom>
            <View className="gap-32">
              <View className="items-center gap-[3.125rem]">
                <form.AppField name="pin">
                  {field => <field.OTPField OTP_LENGTH={4} />}
                </form.AppField>
                <View className="rounded-2xl bg-background-tertiary px-6 py-[18px]">
                  <TextCustom className="max-w-[15.625rem] text-sm/[130%] text-custom-text-tertiary">
                    The API executes only after POST /trade/execute with quoteId
                    and PIN.
                  </TextCustom>
                </View>
              </View>
              <form.AppForm>
                <form.SubscribeButton
                  onPress={form._handleSubmit}
                  isPending={false}
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

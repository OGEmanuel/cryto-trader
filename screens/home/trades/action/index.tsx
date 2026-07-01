import RevampedWrapper from '@/components/revamped-wrapper';
import { useAppForm } from '@/hooks/form';
import { cn } from '@/lib/utils';
import { revalidateLogic } from '@tanstack/react-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import z from 'zod';
import ItemCard from '../../components/item-card';
import Tabs from './tabs';
import TradeControlCard from './trade-control';

const formSchema = z.object({
  top: z.string().min(1, {
    error: 'This field is required to proceed',
  }),
  bottom: z.string().min(1, {
    error: 'This field is required to proceed',
  }),
});

const TradesActionScreen = () => {
  const { action } = useLocalSearchParams<{ action: string }>();
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      top: '',
      bottom: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      router.push('/home/trades/quote');
    },
  });

  let header = 'Buy';
  let description = 'Create a quote before confirming with PIN.';

  if (action === 'buy') {
    header = 'Buy';
    description = 'Create a quote before confirming with PIN.';
  } else if (action === 'sell') {
    header = 'Sell';
    description = 'Preview rate and fees before execution.';
  } else {
    header = 'Swap';
    description = 'Convert one supported coin into another.';
  }

  return (
    <RevampedWrapper
      header={`${header} crypto`}
      description={description}
      goBackTo={'/home/trades'}
    >
      <View className="pt-[18px]">
        <View className="gap-[1.875rem]">
          <Tabs action={action} />
          <ScrollView contentContainerClassName="gap-[4rem] pb-64">
            <View className="gap-10">
              <View className="gap-[1.375rem]">
                <TradeControlCard action={action} position={'top'}>
                  <form.AppField name="top">
                    {field => (
                      <field.TextField
                        inputProps={{
                          placeholder: '0.00',
                          keyboardType: 'decimal-pad', // iOS decimal keypad
                          autoCapitalize: 'none',
                          autoCorrect: false,
                          autoComplete: 'off',
                          textContentType: 'none',
                          returnKeyType: 'done',
                          className:
                            'h-10 w-full max-w-64 font-nm-bold text-custom-text-secondary text-2xl/[130%] p-0',
                        }}
                      />
                    )}
                  </form.AppField>
                </TradeControlCard>
                <TradeControlCard action={action} position={'bottom'}>
                  <form.AppField name="bottom">
                    {field => (
                      <field.TextField
                        inputProps={{
                          placeholder: '0.00',
                          keyboardType: 'decimal-pad', // iOS decimal keypad
                          autoCapitalize: 'none',
                          autoCorrect: false,
                          autoComplete: 'off',
                          textContentType: 'none',
                          returnKeyType: 'done',
                          className:
                            'h-10 w-full max-w-64 font-nm-bold text-custom-text-secondary text-2xl/[130%] p-0',
                        }}
                      />
                    )}
                  </form.AppField>
                </TradeControlCard>
              </View>
              <View className="gap-3">
                <ItemCard
                  name={action === 'swap' ? 'Route' : 'Available'}
                  value="920.00 USDT"
                />
                <ItemCard
                  name={action === 'buy' ? 'Estimated rate' : 'Fee estimate'}
                  value="1 BTC = 64,200.50 USDT"
                />
                <ItemCard
                  name={
                    action === 'buy'
                      ? 'Verification limit'
                      : action === 'sell'
                        ? 'Receive after fees'
                        : 'Quote expires'
                  }
                  value="$5,000"
                  className={cn(action === 'buy' && 'text-primary-2')}
                />
              </View>
            </View>
            <form.AppForm>
              <form.SubscribeButton
                onPress={form._handleSubmit}
                isPending={false}
                className={cn(action === 'sell' && 'bg-destructive-2')}
                label={action === 'swap' ? 'Preview swap' : 'Get quote'}
              />
            </form.AppForm>
          </ScrollView>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default TradesActionScreen;

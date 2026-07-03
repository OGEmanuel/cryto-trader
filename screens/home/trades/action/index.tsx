import RevampedWrapper from '@/components/revamped-wrapper';
import { Colors } from '@/constants/theme';
import { useAppForm } from '@/hooks/form';
import { cn } from '@/lib/utils';
import { useGetAssetsQuery, useGetAssetsSymbolQuery } from '@/services/markets';
import { useGetWalletQuery } from '@/services/wallet';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { revalidateLogic, useField } from '@tanstack/react-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import z from 'zod';
import ErrorState from '../../components/error';
import ItemCard from '../../components/item-card';
import ArrowIcon from '../assets/icons/arrow-icon.svg';
import ArrowUpIcon from '../assets/icons/arrow-up-icon.svg';
import BottomSheetContent from './bottom-sheet-content';
import Tabs from './tabs';
import TradeControlCard from './trade-control';

const formSchema = z.object({
  top: z.string().min(1, {
    error: 'This field is required to proceed',
  }),
  bottom: z.string().min(1, {
    error: 'This field is required to proceed',
  }),
  topCoin: z.string().min(1, {
    error: 'This field is required to proceed',
  }),
  bottomCoin: z.string().min(1, {
    error: 'This field is required to proceed',
  }),
});

const TradesActionScreen = () => {
  const { action } = useLocalSearchParams<{ action: string }>();
  const router = useRouter();
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [swapHolder, setSwapHolder] = useState([
    {
      coin: '',
    },
  ]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  const { data, isError, isLoading, refetch } = useGetAssetsQuery({
    limit: 20,
  });

  const {
    data: walletData,
    isError: isWalletError,
    isLoading: isWalletLoading,
    refetch: refetchWallet,
  } = useGetWalletQuery({});

  const findCoinInWallet = (symbol: string) => {
    return walletData?.data.wallet.balances.find(
      (item: any) => item.assetSymbol === symbol,
    );
  };

  const form = useAppForm({
    defaultValues: {
      top: action === 'buy' ? '' : '1',
      bottom: action === 'buy' ? '1' : action === 'sell' ? '' : '',
      topCoin: action === 'buy' ? 'USDT' : action === 'sell' ? 'BTC' : 'ETH',
      bottomCoin: action === 'buy' ? 'BTC' : action === 'sell' ? 'USDT' : 'SOL',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid: () => {
      Toast.show({
        type: 'error',
        text1: 'Invalid entry',
        text2: 'All fields are required',
      });
    },
    onSubmit: async ({ value }) => {
      if (Number(value.top) < 1) {
        Toast.show({
          type: 'error',
          text1: 'Invalid entry',
          text2: 'Amount must be greater than 0',
        });
        return;
      }
      if (Number(value.bottom) < 1) {
        Toast.show({
          type: 'error',
          text1: 'Invalid entry',
          text2: 'Amount must be greater than 0',
        });
        return;
      }
      if (
        Number(value.top) > (findCoinInWallet(value.topCoin)?.available!! ?? 0)
      ) {
        Toast.show({
          type: 'error',
          text1: 'Insufficient funds',
        });
        return;
      }

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

  const topAmountField = useField({
    name: 'top',
    form,
  });

  const bottomAmountField = useField({
    name: 'bottom',
    form,
  });

  const topCoinField = useField({
    name: 'topCoin',
    form,
  });

  const bottomCoinField = useField({
    name: 'bottomCoin',
    form,
  });

  const {
    data: coinData,
    refetch: refetchCoinData,
    isLoading: isCoinLoading,
    isError: isCoinError,
  } = useGetAssetsSymbolQuery({
    symbol:
      action === 'buy' ? bottomCoinField.state.value : topCoinField.state.value,
  });

  const {
    data: swapCoinData,
    isLoading: isSwapCoinLoading,
    refetch: refetchSwapCoin,
    isError: isSwapCoinError,
  } = useGetAssetsSymbolQuery({
    symbol: bottomCoinField.state.value,
  });

  useEffect(() => {
    if (action === 'buy') {
      topCoinField.setValue('USDT');
      bottomCoinField.setValue('BTC');
    } else if (action === 'sell') {
      topCoinField.setValue('BTC');
      bottomCoinField.setValue('USDT');
    } else if (action === 'swap') {
      topCoinField.setValue('ETH');
      bottomCoinField.setValue('SOL');
    }
  }, [action]);

  useEffect(() => {
    if (coinData) {
      if (action === 'buy') {
        topAmountField.setValue(coinData?.data.priceUsd.toString());
        bottomAmountField.setValue('1');
      } else if (action === 'sell') {
        bottomAmountField.setValue(coinData?.data.priceUsd.toString());
        topAmountField.setValue('1');
      } else {
        topAmountField.setValue('1');
        bottomAmountField.setValue(
          (
            (Number(topAmountField.state.value) * coinData?.data.priceUsd!!) /
            swapCoinData?.data.priceUsd!!
          )
            .toFixed(4)
            .toString(),
        );
        setSwapHolder([
          {
            coin: topCoinField.state.value,
          },
          {
            coin: bottomCoinField.state.value,
          },
        ]);
      }
    }
  }, [coinData?.data.priceUsd, action, swapCoinData?.data.priceUsd]);

  const handleSelectCoin = (value: string, position: 'top' | 'bottom') => {
    if (position === 'top') {
      topCoinField.setValue(value);
    } else {
      bottomCoinField.setValue(value);
    }
    handleClosePress();
  };

  if (isError || isWalletError || isCoinError || isSwapCoinError)
    return (
      <ErrorState
        message="Error fetching info"
        refetch={() => (
          refetch(),
          refetchCoinData(),
          refetchSwapCoin(),
          refetchWallet()
        )}
      />
    );

  return (
    <>
      <RevampedWrapper
        header={`${header} crypto`}
        description={description}
        goBackTo={'/home/trades'}
      >
        <View className="pt-[18px]">
          <View className="gap-[1.875rem]">
            <Tabs action={action} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-[4rem] pb-64"
            >
              <View className="relative gap-10">
                <View className="gap-[1.375rem]">
                  <TradeControlCard
                    isLoading={
                      isLoading ||
                      isWalletLoading ||
                      isCoinLoading ||
                      isSwapCoinLoading
                    }
                    action={action}
                    position={'top'}
                    onOpenBottomSheet={() => (
                      handleOpenPress(),
                      setPosition('top')
                    )}
                    value={topCoinField.state.value}
                  >
                    <form.AppField name="top">
                      {field => (
                        <field.TextField
                          shouldHideError
                          inputProps={{
                            placeholder: '0.00',
                            keyboardType: 'decimal-pad', // iOS decimal keypad
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            autoComplete: 'off',
                            textContentType: 'none',
                            returnKeyType: 'done',
                            className: `${cn(
                              'h-10 w-64 max-w-64 font-nm-bold text-custom-text-secondary text-2xl/[130%] p-0',
                              action !== 'swap' &&
                                Number(field.state.value) >
                                  (findCoinInWallet(topCoinField.state.value)
                                    ?.available!! ?? 0) &&
                                'text-destructive-2',
                            )}`,
                            onChangeText: text => {
                              let sanitized = text
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1');

                              // Remove unnecessary leading zeros
                              if (/^0\d/.test(sanitized)) {
                                sanitized = sanitized.replace(/^0+/, '');
                              }

                              const num = parseFloat(sanitized);
                              if (!isNaN(num) && coinData) {
                                const price = coinData.data.priceUsd;
                                const swapCalc =
                                  (num * coinData?.data.priceUsd) /
                                  swapCoinData?.data.priceUsd!!;
                                const calculated =
                                  action === 'buy'
                                    ? num / price
                                    : action === 'sell'
                                      ? num * price
                                      : swapCalc;
                                bottomAmountField.setValue(
                                  calculated.toFixed(4).toString(),
                                );
                              }

                              field.handleChange(sanitized);
                            },
                          }}
                        />
                      )}
                    </form.AppField>
                  </TradeControlCard>
                  {action === 'swap' && (
                    <Pressable
                      onPress={() => (
                        topCoinField.setValue(swapHolder[1].coin),
                        bottomCoinField.setValue(swapHolder[0].coin),
                        setSwapHolder([
                          {
                            coin: topCoinField.state.value,
                          },
                          {
                            coin: bottomCoinField.state.value,
                          },
                        ])
                      )}
                      className="bg-tertiary-2 absolute top-[40%] z-10 size-[3.5rem] flex-row items-center justify-center self-center rounded-full active:opacity-75"
                    >
                      <ArrowIcon />
                      <ArrowUpIcon />
                    </Pressable>
                  )}
                  <TradeControlCard
                    isLoading={
                      isLoading ||
                      isWalletLoading ||
                      isCoinLoading ||
                      isSwapCoinLoading
                    }
                    action={action}
                    position={'bottom'}
                    onOpenBottomSheet={() => (
                      handleOpenPress(),
                      setPosition('bottom')
                    )}
                    value={bottomCoinField.state.value}
                  >
                    <form.AppField name="bottom">
                      {field => (
                        <field.TextField
                          shouldHideError
                          inputProps={{
                            placeholder: '0.00',
                            keyboardType: 'decimal-pad', // iOS decimal keypad
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            autoComplete: 'off',
                            textContentType: 'none',
                            returnKeyType: 'done',
                            className:
                              'h-10 w-64 max-w-64 font-nm-bold text-custom-text-secondary text-2xl/[130%] p-0',
                            onChangeText: text => {
                              let sanitized = text
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1');

                              // Remove unnecessary leading zeros
                              if (/^0\d/.test(sanitized)) {
                                sanitized = sanitized.replace(/^0+/, '');
                              }

                              const num = parseFloat(sanitized);
                              if (!isNaN(num) && coinData) {
                                const price = coinData.data.priceUsd;
                                const calculated =
                                  action === 'buy'
                                    ? num * price
                                    : action === 'sell'
                                      ? num / price
                                      : num;
                                topAmountField.setValue(
                                  calculated.toFixed(2).toString(),
                                );
                              }

                              field.handleChange(sanitized);
                            },
                          }}
                        />
                      )}
                    </form.AppField>
                  </TradeControlCard>
                </View>
                <View className="gap-3">
                  <ItemCard
                    isLoading={
                      isLoading ||
                      isWalletLoading ||
                      isCoinLoading ||
                      isSwapCoinLoading
                    }
                    name={action === 'swap' ? 'Route' : 'Available'}
                    value={
                      action === 'buy'
                        ? `${findCoinInWallet(topCoinField.state.value)?.available} USDT`
                        : action === 'sell'
                          ? `${findCoinInWallet(topCoinField.state.value)?.available ?? 0} ${topCoinField.state.value}`
                          : topCoinField.state.value !== 'USDT' &&
                              bottomCoinField.state.value !== 'USDT'
                            ? `${topCoinField.state.value} → USDT → ${bottomCoinField.state.value}`
                            : `${topCoinField.state.value} → ${bottomCoinField.state.value}`
                    }
                  />
                  <ItemCard
                    isLoading={
                      isLoading ||
                      isWalletLoading ||
                      isCoinLoading ||
                      isSwapCoinLoading
                    }
                    name={action === 'buy' ? 'Estimated rate' : 'Fee estimate'}
                    value={
                      action === 'buy'
                        ? `1 ${bottomCoinField.state.value} = ${coinData?.data.priceUsd.toLocaleString()} USDT`
                        : action === 'sell'
                          ? '15.50 USDT'
                          : '$4.84'
                    }
                  />
                  <ItemCard
                    isLoading={
                      isLoading ||
                      isWalletLoading ||
                      isCoinLoading ||
                      isSwapCoinLoading
                    }
                    name={
                      action === 'buy'
                        ? 'Verification limit'
                        : action === 'sell'
                          ? 'Receive after fees'
                          : 'Quote expires'
                    }
                    value={
                      action === 'buy'
                        ? `$${walletData?.data.verification.limits.tradePerTransactionUsd.toLocaleString()}`
                        : action === 'sell'
                          ? '1,540.80 USDT'
                          : '30 seconds'
                    }
                    className={cn(action === 'buy' && 'text-primary-2')}
                  />
                </View>
              </View>
              <form.AppForm>
                <form.SubscribeButton
                  onPress={form._handleSubmit}
                  isPending={false}
                  disabled={
                    isLoading ||
                    isWalletLoading ||
                    isCoinLoading ||
                    isSwapCoinLoading
                  }
                  className={cn(action === 'sell' && 'bg-destructive-2')}
                  label={action === 'swap' ? 'Preview swap' : 'Get quote'}
                />
              </form.AppForm>
            </ScrollView>
          </View>
        </View>
      </RevampedWrapper>
      <BottomSheet
        snapPoints={['70%']}
        ref={bottomSheetRef}
        enablePanDownToClose
        enableDynamicSizing={false}
        index={-1}
        backgroundStyle={{
          backgroundColor: Colors.light['background-tertiary'],
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors.light['custom-text-secondary'],
        }}
        containerStyle={{
          zIndex: 20,
        }}
      >
        <BottomSheetView className="h-full flex-grow bg-background-tertiary p-6">
          <BottomSheetContent
            assets={data?.data!!}
            value={
              position === 'top'
                ? topCoinField.state.value
                : bottomCoinField.state.value
            }
            onSelectCoin={value => handleSelectCoin(value, position)}
            altValue={
              position === 'top'
                ? bottomCoinField.state.value
                : topCoinField.state.value
            }
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default TradesActionScreen;

import RevampedWrapper from '@/components/revamped-wrapper';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Order from './order';
import Tabs from './tabs';
import TradesList from './trades';

const OrderBookScreen = () => {
  const router = useRouter();
  const [view, setView] = useState<'orderbook' | 'trades'>('orderbook');

  return (
    <RevampedWrapper
      header={'BTC order book'}
      description={'Bid and ask levels for the trade screen.'}
      onGoBackTo={() => router.push('/home/markets/BTC')}
    >
      <View className="gap-[1.875rem] pt-8">
        <Tabs active={view} onSetActive={setView} />
        {view === 'orderbook' && <Order />}
        {view === 'trades' && <TradesList />}
      </View>
    </RevampedWrapper>
  );
};

export default OrderBookScreen;

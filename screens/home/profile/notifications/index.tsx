import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FlatList, View } from 'react-native';
import RevampedWrapper from '../../components/revamped-wrapper';
import OptionsCard from '../components/options-card';

const NOTIF_LIST = [
  {
    id: 1,
    title: 'KYC approved',
    description: 'You can now trade and withdraw',
    more: 'New',
  },
  {
    id: 2,
    title: 'USDT deposit completed',
    description: '250 USDT added to wallet',
    more: 'New',
  },
  {
    id: 3,
    title: 'BTC price alert',
    description: 'BTC crossed your target',
    more: 'Read',
  },
];

const NotificationsScreen = () => {
  return (
    <RevampedWrapper
      header="Notifications"
      description="Security, KYC, transaction, and alert messages."
      canGoBack
    >
      <View className="gap-6 pt-7">
        <Button
          label="Mark all as read"
          className="bg-background-3"
          labelClassName="font-nm-bold text-custom-text-secondary"
        />
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={NOTIF_LIST}
            renderItem={item => (
              <OptionsCard
                description={item.item.description}
                title={item.item.title}
                more={item.item.more}
              />
            )}
            contentContainerClassName={cn('gap-3')}
            keyExtractor={item => item.id.toString()}
          />
          {/* <View className="gap-3 rounded-[18px] bg-background-tertiary p-6">
            <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
              All caught up
            </TextCustom>
            <TextCustom className="max-w-[17.875rem] text-xs/[130%] text-custom-text-tertiary">
              When the list is empty, show this calm state instead of a blank
              screen.
            </TextCustom>
          </View> */}
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default NotificationsScreen;

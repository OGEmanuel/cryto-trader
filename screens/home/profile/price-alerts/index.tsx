import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FlatList, Modal, View } from 'react-native';
import RevampedWrapper from '../../components/revamped-wrapper';
import OptionsCard from '../components/options-card';

const ALERTS_LIST = [
  {
    id: 1,
    title: 'BTC above $72,000',
    description: 'Active · push notification on',
    more: 'On',
  },
  {
    id: 2,
    title: 'ETH below $2,900',
    description: 'Paused',
    more: 'Off',
  },
  {
    id: 3,
    title: 'SOL above $170',
    description: 'Triggered today',
    more: 'Read',
  },
];

const PriceAlertsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <RevampedWrapper
      header="Price alerts"
      description="Create, edit, pause, or delete market alerts."
      goBackTo={'/home'}
    >
      <View className="pt-7">
        <View className="gap-6">
          <Button label="Create alert" labelClassName="font-nm-bold" />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ALERTS_LIST}
            renderItem={item => (
              <OptionsCard
                description={item.item.description}
                title={item.item.title}
                more={item.item.more}
                onPress={() => setModalVisible(true)}
                indicatorClassName={cn(
                  item.item.more.toLowerCase() === 'off' && 'bg-destructive-3',
                )}
                moreClassName={cn(
                  item.item.more.toLowerCase() === 'off' &&
                    'text-destructive-3',
                )}
              />
            )}
            contentContainerClassName={cn('gap-3')}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center">
          <View className="gap-[10px] rounded-[20px] bg-background p-7">
            <TextCustom className="font-nm-bold text-lg/[130%] text-custom-text-secondary">
              Delete alert?
            </TextCustom>
            <View className="gap-3">
              <TextCustom className="w-60 text-sm/[130%] text-custom-text-tertiary">
                This removes the BTC above $72,000 alert from your list.
              </TextCustom>
              <View className="flex-row gap-6">
                <Button
                  label="Cancel"
                  onPress={() => setModalVisible(false)}
                  className="flex-1 bg-background-tertiary"
                  labelClassName="font-nm-bold text-custom-text-secondary"
                />
                <Button
                  label="Delete"
                  labelClassName="font-nm-bold text-custom-text-3"
                  className="flex-1 bg-destructive-3"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </RevampedWrapper>
  );
};

export default PriceAlertsScreen;

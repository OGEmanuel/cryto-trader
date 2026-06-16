import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import RevampedWrapper from '@/screens/home/components/revamped-wrapper';
import { FlatList, View } from 'react-native';
import OptionsCard from '../../components/options-card';

const DEVICES_LIST = [
  {
    id: 1,
    title: 'iPhone 15 Pro',
    description: 'iOS · Push enabled',
    more: 'Current',
  },
  {
    id: 2,
    title: 'Chrome browser',
    description: 'Web · Last seen today',
    more: 'Active',
  },
  {
    id: 3,
    title: 'Expo Go',
    description: 'Android · Last seen yesterday',
  },
];

const DevicesScreen = () => {
  return (
    <RevampedWrapper
      header="Devices"
      description="Registered devices for push notification and session awareness."
      goBackTo={'/home/profile'}
    >
      <View className="gap-24 pt-7">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DEVICES_LIST}
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
        <View className="gap-3 rounded-[18px] bg-background-tertiary p-6">
          <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
            No unknown devices
          </TextCustom>
          <TextCustom className="max-w-[17.875rem] text-xs/[130%] text-custom-text-tertiary">
            New device alerts appear here after sign in from another device.
          </TextCustom>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default DevicesScreen;

import TextCustom from '@/components/ui/text';
import { Pressable, View } from 'react-native';

const OPTIONS_LIST = [
  { id: 1, title: 'Edit Profile', description: 'Name, email, phone' },
  { id: 2, title: 'Security', description: '2FA, PIN, recovery codes' },
  { id: 3, title: 'Price alerts', description: '3 active alerts' },
  { id: 4, title: 'Notifications', description: '2 unread messages' },
  { id: 5, title: 'Watchlist', description: 'BTC, ETH, SOL' },
];

const Options = () => {
  return (
    <View className="gap-3">
      {OPTIONS_LIST.map(item => (
        <Pressable
          key={item.id}
          className="flex-row items-center gap-[14px] rounded-2xl bg-background-tertiary px-[18px] py-4 active:opacity-75"
        >
          <View className="size-7 rounded-full bg-primary/95"></View>
          <View className="gap-1">
            <TextCustom className="font-nm-bold text-sm/[130%] text-custom-text-secondary">
              {item.title}
            </TextCustom>
            <TextCustom className="text-[10px]/[130%] text-custom-text-tertiary">
              {item.description}
            </TextCustom>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default Options;

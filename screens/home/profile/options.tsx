import { Href, useRouter } from 'expo-router';
import { View } from 'react-native';
import OptionsCard from './components/options-card';

const OPTIONS_LIST = [
  {
    id: 1,
    title: 'Edit Profile',
    description: 'Name, email, phone',
  },
  {
    id: 2,
    title: 'Security',
    description: '2FA, PIN, recovery codes',
    link: '/home/profile/security' as Href,
  },
  {
    id: 3,
    title: 'Price alerts',
    description: '3 active alerts',
    more: 3,
    link: '/home/profile/price-alerts' as Href,
  },
  {
    id: 4,
    title: 'Notifications',
    description: '2 unread messages',
    more: 2,
    link: '/home/profile/notifications' as Href,
  },
  {
    id: 5,
    title: 'Watchlist',
    description: 'BTC, ETH, SOL',
    // link: '/home/profile/security' as Href,
  },
];

const Options = () => {
  const router = useRouter();
  return (
    <View className="gap-3">
      {OPTIONS_LIST.map(item => (
        <OptionsCard
          key={item.id}
          onPress={() => item.link && router.push(item.link)}
          title={item.title}
          description={item.description}
        />
      ))}
    </View>
  );
};

export default Options;

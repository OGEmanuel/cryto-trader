import BottomTab from '@/screens/home/components/bottom-tab';
import { Tabs } from 'expo-router';

const TAB_PAGES = [
  {
    id: 1,
    name: 'index',
    title: 'Home',
  },
  {
    id: 2,
    name: 'markets',
    title: 'Markets',
  },
  {
    id: 3,
    name: 'trades/index',
    title: 'Trades',
  },
  {
    id: 4,
    name: 'activity',
    title: 'Activity',
  },
  {
    id: 5,
    name: 'wallets',
    title: 'Wallets',
  },
] as const;

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTab {...props} />}
    >
      {TAB_PAGES.slice(0, 5).map(page => (
        <Tabs.Screen
          key={page.id}
          name={page.name}
          options={{
            title: page.title,
          }}
        />
      ))}
    </Tabs>
  );
};

export default Layout;

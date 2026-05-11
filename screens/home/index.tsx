import { ScrollView, View } from 'react-native';
import Header from './components/header';
import QuickActions from './quick-actions';
import QuickLinks from './quick-links';
import RecentCoin from './recent-coin';
import TopCoins from './top-coins';

const HomeScreen = () => {
  return (
    <View className="flex-1">
      <Header />
      <QuickActions />
      <ScrollView>
        <View className="gap-7 bg-white">
          <QuickLinks />
          <View className="gap-[1.875rem] pb-28">
            <RecentCoin />
            <TopCoins />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

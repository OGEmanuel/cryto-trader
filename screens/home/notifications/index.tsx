import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Header from '../components/header';
import PageWrapper from '../components/page-wrapper';
import FilterIcon from './assets/icons/filter.svg';
import { NOTIFICATION_DATA } from './lib/data';
import List from './list';

const NotificationsScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <PageWrapper>
      <Header />
      <View
        className={cn(
          'flex-1 p-6',
          NOTIFICATION_DATA.length < 1 && 'justify-between',
        )}
        style={{
          marginBottom: tabBarHeight,
        }}
      >
        <View className="flex-row items-center justify-between">
          <TextCustom className="font-nm-bold text-lg/[100%] text-white">
            Notifications
          </TextCustom>
          <View className="flex-row items-center gap-[10px]">
            {NOTIFICATION_DATA.length > 0 && (
              <TextCustom className="text-sm/6 text-secondary">
                Mark Read All
              </TextCustom>
            )}
            <FilterIcon />
          </View>
        </View>
        <List />
        <View className="android:bottom-10 ios:bottom-4 absolute h-16 w-full self-center">
          <LinearGradient
            colors={['rgba(27, 35, 42, 0)', '#1B232A']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="size-full"
            style={{ ...StyleSheet.absoluteFillObject }}
          />
        </View>
        <View className="border border-tertiary" />
      </View>
    </PageWrapper>
  );
};

export default NotificationsScreen;

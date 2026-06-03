import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import {
  useGetNotificationsQuery,
  useReadAllMutation,
} from '@/services/profile';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import ErrorState from '../components/error';
import Header from '../components/header';
import PageWrapper from '../components/page-wrapper';
import FilterIcon from './assets/icons/filter.svg';
import List from './list';
import { NotificationSkeleton } from './skeleton-loader';

const NotificationsScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { data, isLoading, isError, refetch } = useGetNotificationsQuery({});
  const [readAll] = useReadAllMutation();

  const handleReadAll = async () => {
    try {
      await readAll({});
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Failed to mark all messages as read',
        text2: message,
      });
    }
  };

  return (
    <PageWrapper>
      <Header />
      <View
        className={cn(
          'flex-1 p-6',
          data?.data && data.data.length < 1 && 'justify-between',
          isError && 'justify-between',
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
            {data?.data && data.data.length > 0 && (
              <Pressable onPress={handleReadAll}>
                <TextCustom className="text-sm/6 text-secondary">
                  Mark Read All
                </TextCustom>
              </Pressable>
            )}
            <FilterIcon />
          </View>
        </View>
        {isLoading ? (
          <View className="gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <NotificationSkeleton key={index} />
            ))}
          </View>
        ) : isError ? (
          <ErrorState
            refetch={refetch}
            message="Failed to fetch notifications"
          />
        ) : (
          <List />
        )}
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

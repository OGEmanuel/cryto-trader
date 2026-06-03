import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import {
  Notification,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '@/services/profile';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlatList, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import EmptySection from './empty';

const List = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { data } = useGetNotificationsQuery({});

  const RenderNotificationsList = (props: { data: Notification }) => {
    const [markAsRead] = useMarkAsReadMutation();
    const { data } = props;

    const handleMarkAsRead = async () => {
      try {
        await markAsRead({
          notificationId: data.id,
        });
      } catch (err: any) {
        const message = err?.data?.error.message || 'Something went wrong';

        Toast.show({
          type: 'error',
          text1: 'Failed to mark message as read',
          text2: message,
        });
      }
    };

    return (
      <Pressable
        onPress={() => handleMarkAsRead()}
        className="gap-1 border-t border-tertiary pt-[14px] active:opacity-75"
      >
        <View className="flex-row items-center gap-[6px]">
          <TextCustom className="font-nm-medium text-sm/6 text-custom-text">
            {data.title}
          </TextCustom>
          {data.isRead && (
            <View className={cn('size-3 rounded-full bg-primary')} />
          )}
        </View>
        <TextCustom className="text-sm/6 text-secondary">
          {data.body}
        </TextCustom>
      </Pressable>
    );
  };

  return (
    <View
      className={cn(
        'relative flex-1 py-3',
        data?.data &&
          data.data.length < 1 &&
          'flex-row items-center justify-center',
      )}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.data}
        ListEmptyComponent={<EmptySection />}
        renderItem={item => <RenderNotificationsList data={item.item} />}
        contentContainerClassName={cn(
          'gap-4',
          data?.data && data.data.length < 1 && 'justify-center flex-1',
        )}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default List;

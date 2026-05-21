import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlatList, View } from 'react-native';
import EmptySection from './empty';
import { NOTIFICATION_DATA } from './lib/data';
import { NotificationListType } from './lib/types';

const List = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const RenderNotificationsList = (props: { data: NotificationListType }) => {
    const { data } = props;
    return (
      <View className="gap-1 border-t border-tertiary pt-[14px]">
        <View className="flex-row items-center gap-[6px]">
          <TextCustom className="font-nm-medium text-sm/6 text-custom-text">
            {data.title}
          </TextCustom>
          <View
            className={cn(
              'size-3 rounded-full',
              data.status === 'success' && 'bg-primary',
              data.status === 'warning' && 'bg-warning',
              data.status === 'urgent' && 'bg-destructive',
            )}
          />
        </View>
        <TextCustom className="text-sm/6 text-secondary">
          {data.message}
        </TextCustom>
      </View>
    );
  };

  return (
    <View className="relative flex-1 py-3">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={NOTIFICATION_DATA}
        ListEmptyComponent={<EmptySection />}
        renderItem={item => <RenderNotificationsList data={item.item} />}
        contentContainerClassName={cn(
          'gap-4 flex-1',
          NOTIFICATION_DATA.length < 1 && 'justify-center',
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

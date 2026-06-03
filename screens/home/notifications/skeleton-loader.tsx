import { Colors } from '@/constants/theme';
import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

export function NotificationSkeleton() {
  return (
    <View className="gap-1 border-t border-tertiary pt-[14px]">
      <View className="flex-row items-center gap-[6px]">
        <Skeleton
          colorMode="dark"
          width={120}
          height={16}
          radius={4}
          backgroundColor={Colors.light['background-2']}
        />

        <Skeleton
          colorMode="dark"
          width={12}
          height={12}
          radius="round"
          backgroundColor={Colors.light['background-2']}
        />
      </View>

      <Skeleton
        colorMode="dark"
        width="100%"
        height={14}
        radius={4}
        backgroundColor={Colors.light['background-2']}
      />

      <Skeleton
        colorMode="dark"
        width="80%"
        height={14}
        radius={4}
        backgroundColor={Colors.light['background-2']}
      />
    </View>
  );
}

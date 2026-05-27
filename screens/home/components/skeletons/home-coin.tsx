import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { Skeleton } from 'moti/skeleton';
import { ScrollView, View } from 'react-native';

const HomeCoinSkeleton = (props: { header: string }) => {
  const { header } = props;

  return (
    <View className="gap-4">
      <TextCustom className="pl-6 font-nm-bold text-lg/[100%] text-background">
        {header}
      </TextCustom>
      <ScrollView
        className="flex-row gap-2 px-6"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} className="overflow-hidden rounded-2xl px-2">
            <Skeleton
              show
              height={108}
              width={168}
              colorMode="light"
              radius={'square'}
              backgroundColor={Colors.light['background-2']}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeCoinSkeleton;

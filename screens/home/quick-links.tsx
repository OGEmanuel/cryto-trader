import TextCustom from '@/components/ui/text';
import RocketIcon from '@/screens/home/assets/icons/rocket.svg';
import { useGetCurrentProfileQuery } from '@/services/profile';
import { Link } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { Image, Pressable, View } from 'react-native';
import ArrowIcon from './assets/icons/arrow-right.svg';

const QuickLinks = () => {
  const { data, isLoading } = useGetCurrentProfileQuery({});

  if (isLoading) return <SkeletonLoader />;

  return data && data.data.kycStatus !== 'approved' ? (
    <>
      <View className="px-6 pt-5">
        <Link href={'/kyc'} asChild>
          <Pressable className="flex-row items-center justify-between rounded-2xl bg-extra/50 p-3 active:opacity-75">
            <View className="flex-row items-center gap-4">
              <View className="relative size-[3.25rem]">
                <Image
                  source={require('./assets/img/icon-bg.png')}
                  className="size-full"
                />
                <View className="absolute">
                  <RocketIcon />
                </View>
              </View>
              <View className="gap-2">
                <TextCustom className="font-nm-medium text-base/[100%] text-background">
                  Verify to trade
                </TextCustom>
                <TextCustom className="max-w-[15.625rem] text-sm/[100%] text-custom-tertiary">
                  Trading and withdrawals are locked until your identity is
                  approved.
                </TextCustom>
              </View>
            </View>
            <View className="size-10 items-center justify-center rounded-2xl bg-extra">
              <ArrowIcon />
            </View>
          </Pressable>
        </Link>
      </View>
    </>
  ) : null;
};

export default QuickLinks;

const SkeletonLoader = () => {
  return (
    <View className="px-6 pt-5">
      <View className="flex-row items-center justify-between rounded-2xl bg-extra/50 p-3">
        <View className="flex-row items-center gap-4">
          {/* Icon */}
          <Skeleton colorMode="light" width={52} height={52} radius="round" />

          <View className="gap-2">
            {/* Title */}
            <Skeleton colorMode="light" width={120} height={16} radius={4} />

            {/* Description */}
            <Skeleton colorMode="light" width={220} height={14} radius={4} />

            <Skeleton colorMode="light" width={180} height={14} radius={4} />
          </View>
        </View>

        {/* Arrow button */}
        <Skeleton colorMode="light" width={40} height={40} radius={16} />
      </View>
    </View>
  );
};

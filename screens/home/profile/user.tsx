import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { cn } from '@/lib/utils';
import { useGetCurrentProfileQuery } from '@/services/profile';
import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

const User = () => {
  const { data, isError, isLoading } = useGetCurrentProfileQuery({});

  if (isError) return null;

  return (
    <Skeleton.Group show={isLoading}>
      <View className="flex-row items-center gap-[14px] pt-7">
        <Skeleton
          width={74}
          height={74}
          radius="round"
          backgroundColor={Colors.light['background-2']}
        >
          <View className="size-[4.625rem] items-center justify-center rounded-full bg-primary">
            <TextCustom className="font-nm-bold text-[2rem]/[130%]">
              {data?.data.fullName[0]}
            </TextCustom>
          </View>
        </Skeleton>

        <View className="gap-[10px]">
          <View className="gap-1">
            <Skeleton
              width={140}
              height={24}
              backgroundColor={Colors.light['background-2']}
            >
              <TextCustom className="font-nm-bold text-xl/[130%] text-custom-text-secondary">
                {data?.data.fullName}
              </TextCustom>
            </Skeleton>

            <Skeleton
              width={180}
              height={14}
              backgroundColor={Colors.light['background-2']}
            >
              <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                {data?.data.email}
              </TextCustom>
            </Skeleton>
          </View>

          <Skeleton
            width={96}
            height={32}
            radius={12}
            backgroundColor={Colors.light['background-2']}
          >
            <TextCustom
              className={cn(
                'w-24 rounded-xl py-2 text-center font-nm-bold text-[10px]/[130%]',
                data?.data.emailVerified
                  ? 'bg-custom-tertiary text-primary'
                  : 'bg-destructive-2',
              )}
            >
              {data?.data.emailVerified ? 'Verified' : 'Not Verified'}
            </TextCustom>
          </Skeleton>
        </View>
      </View>
    </Skeleton.Group>
  );
};

export default User;

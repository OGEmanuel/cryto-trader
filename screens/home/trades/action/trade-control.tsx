import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useGetAssetsSymbolQuery } from '@/services/markets';
import { Skeleton } from 'moti/skeleton';
import { Pressable, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { getSvgUri } from '../../lib/utils';

const TradeControlCard = (props: {
  children: React.ReactNode;
  action: string;
  position: 'top' | 'bottom';
  onOpenBottomSheet: () => void;
  value: string;
  isLoading: boolean;
}) => {
  const { children, action, position, onOpenBottomSheet, value, isLoading } =
    props;

  const { data } = useGetAssetsSymbolQuery({
    symbol: value,
  });

  return (
    <Skeleton.Group show={isLoading}>
      <View className="flex-row items-center justify-between rounded-[18px] bg-background-tertiary px-[1.375rem] py-[1.125rem]">
        <View className="gap-4">
          <Skeleton width={72} height={14}>
            <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
              {action === 'buy'
                ? position === 'top'
                  ? 'You pay'
                  : 'You receive'
                : action === 'sell'
                  ? position === 'top'
                    ? 'You sell'
                    : 'You receive'
                  : position === 'top'
                    ? 'from'
                    : 'to'}
            </TextCustom>
          </Skeleton>

          <Skeleton width={140} height={40}>
            <View>{children}</View>
          </Skeleton>
        </View>

        <Skeleton width={82} height={34} radius={16}>
          <Pressable
            onPress={onOpenBottomSheet}
            className="h-[2.125rem] w-[5.125rem] flex-row items-center justify-between gap-2 rounded-2xl bg-background-3 p-2 active:opacity-75"
            disabled={
              action === 'buy' && position === 'top'
                ? true
                : action === 'sell' && position === 'bottom'
                  ? true
                  : false
            }
          >
            <View
              className={cn(
                'size-5 rounded-full bg-primary-2',
                action === 'sell' && position === 'top' && 'bg-destructive-2',
                data && '!bg-transparent',
              )}
            >
              {data && (
                <SvgUri
                  width={20}
                  height={20}
                  uri={getSvgUri(data.data.iconUrl!!)}
                />
              )}
            </View>
            <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
              {value}
            </TextCustom>
          </Pressable>
        </Skeleton>
      </View>
    </Skeleton.Group>
  );
};

export default TradeControlCard;

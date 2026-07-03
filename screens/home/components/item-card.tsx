import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

const ItemCard = (props: {
  name: string;
  value: string;
  className?: string;
  isLoading: boolean;
}) => {
  const { name, value, className, isLoading } = props;
  return (
    <Skeleton.Group show={isLoading}>
      <View className="flex-row items-center justify-between rounded-xl bg-background-tertiary px-[1.125rem] py-7">
        <Skeleton width={80} height={14}>
          <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
            {name}
          </TextCustom>
        </Skeleton>

        <Skeleton width={100} height={14}>
          <TextCustom
            className={cn(
              'self-end font-nm-bold text-sm/[130%] text-custom-text-secondary',
              className,
            )}
          >
            {value}
          </TextCustom>
        </Skeleton>
      </View>
    </Skeleton.Group>
  );
};

export default ItemCard;

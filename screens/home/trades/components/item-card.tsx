import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';

const ItemCard = (props: {
  name: string;
  value: string;
  className?: string;
}) => {
  const { name, value, className } = props;
  return (
    <View className="flex-row items-center justify-between rounded-xl bg-background-tertiary px-[1.125rem] py-7">
      <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
        {name}
      </TextCustom>
      <TextCustom
        className={cn(
          'font-nm-bold text-sm/[130%] text-custom-text-secondary',
          className,
        )}
      >
        {value}
      </TextCustom>
    </View>
  );
};

export default ItemCard;

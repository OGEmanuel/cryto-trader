import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';

const ChecklistItemCard = (props: {
  title: string;
  status: string;
  className?: string;
}) => {
  const { title, status, className } = props;
  return (
    <View className="flex-row justify-between rounded-xl bg-background-tertiary px-[18px] pb-[22px] pt-3">
      <TextCustom className="leading-[130%] text-custom-text-tertiary">
        {title}
      </TextCustom>
      <TextCustom
        className={cn(
          'leading-/[130%] font-nm-medium text-custom-extra',
          className,
        )}
      >
        {status}
      </TextCustom>
    </View>
  );
};

export default ChecklistItemCard;

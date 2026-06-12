import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Pressable } from 'react-native';

const SecurityCard = (props: {
  name: string;
  value: string;
  nameClassName?: string;
  valueClassName?: string;
  onPress?: () => void;
}) => {
  const { name, value, nameClassName, valueClassName, onPress } = props;

  return (
    <Pressable
      onPress={onPress}
      className="gap-2 rounded-2xl bg-background-tertiary px-[18] py-[14px] active:opacity-75"
    >
      <TextCustom
        className={cn(
          'text-[10px]/[130%] text-custom-text-tertiary',
          nameClassName,
        )}
      >
        {name}
      </TextCustom>
      <TextCustom
        className={cn(
          'font-nm-medium leading-[130%] text-custom-extra',
          valueClassName,
        )}
      >
        {value}
      </TextCustom>
    </Pressable>
  );
};

export default SecurityCard;

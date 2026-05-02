import { cn } from '@/lib/utils';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import TextCustom from './text';

const Button = (props: {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
  labelClassName?: string;
  label: string;
}) => {
  const { onPress, style, className, labelClassName, label } = props;

  return (
    <Pressable
      onPress={onPress}
      style={style}
      className={cn(
        'bg-primary h-[3.375rem] items-center justify-center rounded-2xl active:opacity-75',
        className,
      )}
    >
      <TextCustom
        className={cn('text-foreground text-lg/[100%]', labelClassName)}
      >
        {label}
      </TextCustom>
    </Pressable>
  );
};

export default Button;

import { cn } from '@/lib/utils';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import TextCustom from './text';

const Button = (props: {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
  labelClassName?: string;
  label: string;
  variant?: 'primary' | 'secondary';
}) => {
  const {
    onPress,
    style,
    className,
    labelClassName,
    label,
    variant = 'primary',
  } = props;

  return (
    <Pressable
      onPress={onPress}
      style={style}
      className={cn(
        'h-[3.375rem] items-center justify-center rounded-2xl active:opacity-75',
        variant === 'primary' ? 'bg-primary' : 'bg-secondary',
        className,
      )}
    >
      <TextCustom
        className={cn(
          'text-lg/[100%]',
          variant === 'primary' ? 'text-foreground' : 'text-white',
          labelClassName,
        )}
      >
        {label}
      </TextCustom>
    </Pressable>
  );
};

export default Button;

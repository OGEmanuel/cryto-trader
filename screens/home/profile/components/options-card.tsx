import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ActivityIndicator, Pressable, View } from 'react-native';

const OptionsCard = (props: {
  title: string;
  description: string;
  more?: string;
  onPress?: () => void;
  indicatorClassName?: string;
  moreClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  const {
    title,
    description,
    onPress,
    more,
    indicatorClassName,
    moreClassName,
    disabled,
    isLoading,
  } = props;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="rounded-2xl bg-background-tertiary px-[18px] py-4 active:opacity-75"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-[14px]">
          <View
            className={cn(
              'size-7 rounded-full bg-primary/95',
              indicatorClassName,
            )}
          />
          <View className="gap-1">
            <TextCustom className="font-nm-bold text-sm/[130%] text-custom-text-secondary">
              {title}
            </TextCustom>
            <TextCustom className="text-[10px]/[130%] text-custom-text-tertiary">
              {description}
            </TextCustom>
          </View>
        </View>
        {more &&
          (isLoading && more.toLowerCase() === 'off' ? (
            <ActivityIndicator className={cn('text-white')} />
          ) : (
            <TextCustom
              className={cn(
                'text-xs/[130%] font-semibold text-primary',
                moreClassName,
              )}
            >
              {more}
            </TextCustom>
          ))}
      </View>
    </Pressable>
  );
};

export default OptionsCard;

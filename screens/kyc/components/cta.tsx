import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { View } from 'react-native';

const Cta = (props: {
  label: string;
  footNote?: string;
  onPress: () => void;
  className?: string;
  labelClassName?: string;
  isLoading?: boolean;
}) => {
  const {
    label,
    footNote = '',
    onPress,
    className,
    labelClassName,
    isLoading,
  } = props;

  return (
    <View className="gap-4">
      <Button
        label={label}
        isPending={isLoading}
        disabled={isLoading}
        onPress={onPress}
        className={className}
        labelClassName={labelClassName}
      />
      <TextCustom className="text-center text-[10px]/[130%] text-custom-text-tertiary">
        {footNote}
      </TextCustom>
    </View>
  );
};

export default Cta;

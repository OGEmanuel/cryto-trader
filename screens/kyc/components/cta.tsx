import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { View } from 'react-native';

const Cta = (props: {
  label: string;
  footNote?: string;
  onPress: () => void;
  className?: string;
  labelClassName?: string;
}) => {
  const { label, footNote = '', onPress, className, labelClassName } = props;

  return (
    <View className="gap-4">
      <Button
        label={label}
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

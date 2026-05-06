import { cn } from '@/lib/utils';
import { Text, TextProps } from 'react-native';

const TextCustom = (props: TextProps) => {
  const { className, children } = props;
  return (
    <Text className={cn('font-nm tracking-[0.0264em]', className)}>
      {children}
    </Text>
  );
};

export default TextCustom;

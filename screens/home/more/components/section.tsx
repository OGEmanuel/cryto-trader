import TextCustom from '@/components/ui/text';
import { View } from 'react-native';

const Section = (props: { title: string; children: React.ReactNode }) => {
  const { title, children } = props;

  return (
    <View className="gap-[14px]">
      <TextCustom className="border-b border-tertiary pb-3 font-nm-medium text-lg/[100%] text-custom-text">
        {title}
      </TextCustom>
      {children}
    </View>
  );
};

export default Section;

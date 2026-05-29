import TextCustom from '@/components/ui/text';
import { getFullWidth } from '@/lib/utils';
import React from 'react';
import { View } from 'react-native';

const PageWrapper = (props: { title: string; children: React.ReactNode }) => {
  const { title, children } = props;

  return (
    <View
      style={{
        width: getFullWidth(),
      }}
      className="flex-1 gap-11 px-6"
    >
      <TextCustom className="font-nm-bold text-[2rem]/[2.875rem] text-white">
        {title}
      </TextCustom>
      {children}
    </View>
  );
};

export default PageWrapper;

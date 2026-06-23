import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import React from 'react';
import { View } from 'react-native';

const CircleIndicator = (props: {
  className?: string;
  floatingCircleClassName?: string;
  textClassName?: string;
  text?: string;
  children?: React.ReactNode;
}) => {
  const { className, floatingCircleClassName, textClassName, text, children } =
    props;

  return (
    <View className="items-center justify-center">
      <View
        className={cn(
          'relative size-[9.375rem] items-center justify-center rounded-full bg-background-secondary',
          className,
        )}
      >
        <View
          className={cn(
            'absolute size-[5.875rem] rounded-full bg-background-3',
            floatingCircleClassName,
          )}
        />
        {children ?? (
          <TextCustom
            className={cn(
              'font-nm-bold text-lg/[130%] text-custom-text-secondary',
              textClassName,
            )}
          >
            {text}
          </TextCustom>
        )}
      </View>
    </View>
  );
};

export default CircleIndicator;

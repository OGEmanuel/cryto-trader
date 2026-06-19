import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';

const Steps = () => {
  return (
    <View className="gap-6">
      <StepCard
        step={0}
        title="Starter"
        description="Trade locked · Withdraw locked · $100 deposit"
      />
      <StepCard
        step={1}
        title="Review"
        description="Documents submitted · $250 deposit"
      />
      <StepCard
        step={2}
        title="Verified"
        description="Documents submitted · $250 deposit"
      />
    </View>
  );
};

export default Steps;

const StepCard = (props: {
  step: number;
  title: string;
  description: string;
}) => {
  const { step, title, description } = props;

  return (
    <View
      className={cn(
        'flex-row gap-3 rounded-2xl px-4 py-7',
        step === 2 ? 'bg-background-secondary' : 'bg-background-tertiary',
      )}
    >
      <View
        className={cn(
          'size-8 items-center justify-center rounded-full',
          step === 2 ? 'bg-primary' : 'bg-background-3',
        )}
      >
        <TextCustom
          className={cn(
            'font-nm-bold leading-[130%]',
            step === 2 ? 'text-custom-text-3' : 'text-custom-text-tertiary',
          )}
        >
          {step}
        </TextCustom>
      </View>
      <View className="gap-1">
        <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
          {title}
        </TextCustom>
        <TextCustom className="w-full max-w-[230px] text-sm/[130%] text-custom-text-tertiary">
          {description}
        </TextCustom>
      </View>
    </View>
  );
};

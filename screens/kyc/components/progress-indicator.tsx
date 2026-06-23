import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

const STAGES = [
  { stage: 1, title: 'Identity' },
  { stage: 2, title: 'Document' },
  { stage: 3, title: 'Review' },
];

const ProgressIndicator = () => {
  const page = useSelector((state: RootState) => state.pageControl.value);

  return (
    <View className="items-center">
      <View className="relative w-full max-w-[300px] flex-row items-center justify-between">
        <View className="absolute left-[12px] top-[13px] h-[2px] w-[90%] rounded-[1px] bg-secondary-2">
          <View
            style={{
              width:
                page < 3 || page >= 8
                  ? '0%'
                  : page < 5 && page >= 3
                    ? '50%'
                    : '100%',
            }}
            className="h-full bg-primary"
          ></View>
        </View>
        {STAGES.map((stage, i) => (
          <View key={stage.stage} className="items-center gap-[6px]">
            <View
              className={cn(
                'flex size-8 items-center justify-center rounded-full bg-background-3',
                page === 2 && stage.stage === 1 && 'bg-primary',
                page === 3 && stage.stage <= 2 && 'bg-primary',
                page === 4 && stage.stage <= 2 && 'bg-primary',
                page >= 5 && page < 8 && 'bg-primary',
                page === 8 && stage.stage === 1 && 'bg-primary',
              )}
            >
              <TextCustom
                className={cn(
                  'font-nm-bold text-sm/[130%] text-custom-text-tertiary',
                  page === 2 && stage.stage === 1 && 'text-custom-text-3',
                  page === 3 && stage.stage <= 2 && 'text-custom-text-3',
                  page === 4 && stage.stage <= 2 && 'text-custom-text-3',
                  page >= 5 && page < 8 && 'text-custom-text-3',
                  page === 8 && stage.stage === 1 && 'text-custom-text-3',
                )}
              >
                {stage.stage}
              </TextCustom>
            </View>
            <TextCustom className="text-[10px]/[130%] text-custom-text-tertiary">
              {stage.title}
            </TextCustom>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProgressIndicator;

import TextCustom from '@/components/ui/text';
import { View } from 'react-native';

const STAGES = [
  { stage: 1, title: 'Identity' },
  { stage: 2, title: 'Document' },
  { stage: 3, title: 'Review' },
];

const ProgressIndicator = () => {
  return (
    <View className="items-center">
      <View className="relative w-full max-w-[300px] flex-row items-center justify-between">
        <View className="bg-secondary-2 absolute left-[12px] top-[10px] h-[2px] w-[90%] rounded-[1px]">
          <View></View>
        </View>
        {STAGES.map(stage => (
          <View key={stage.stage} className="items-center gap-[6px]">
            <View className="flex size-6 items-center justify-center rounded-full bg-background-3">
              <TextCustom className="font-nm-bold text-[10px]/[130%] text-custom-text-tertiary">
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

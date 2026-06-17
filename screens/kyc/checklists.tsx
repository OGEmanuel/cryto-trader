import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';

const Checklists = () => {
  return (
    <View className="gap-[14px]">
      <ChecklistItemCard title="Trade limit" status="Locked" />
      <ChecklistItemCard title="Withdrawal limit" status="Locked" />
      <ChecklistItemCard title="Sandbox deposit" status="$100 max" />
    </View>
  );
};

export default Checklists;

const ChecklistItemCard = (props: { title: string; status: string }) => {
  const { title, status } = props;
  return (
    <View className="flex-row justify-between rounded-xl bg-background-tertiary px-[18px] pb-[22px] pt-3">
      <TextCustom className="leading-[130%] text-custom-text-tertiary">
        {title}
      </TextCustom>
      <TextCustom
        className={cn(
          'leading-/[130%] font-nm-medium',
          status.includes('$') ? 'text-custom-extra' : 'text-destructive-2',
        )}
      >
        {status}
      </TextCustom>
    </View>
  );
};

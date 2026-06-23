import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';
import ChecklistItemCard from '../components/checklist-item-card';

const Checklists = () => {
  return (
    <View className="gap-[14px]">
      <ChecklistItemCard title="Trade limit" status="Locked" />
      <ChecklistItemCard title="Withdrawal limit" status="Locked" />
      <ChecklistItemCard
        title="Sandbox deposit"
        status="$100 max"
        className="text-destructive-2"
      />
    </View>
  );
};

export default Checklists;

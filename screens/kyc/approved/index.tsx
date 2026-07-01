import TextCustom from '@/components/ui/text';
import SuccessSymbol from '@/screens/home/components/success-symbol';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import ChecklistItemCard from '../components/checklist-item-card';
import Cta from '../components/cta';

const Approved = () => {
  const router = useRouter();

  return (
    <>
      <View className="gap-16">
        <View className="gap-6">
          <SuccessSymbol />
          <TextCustom className="text-center font-nm-bold text-lg/[130%] text-custom-text-secondary">
            Level 2 unlocked
          </TextCustom>
        </View>
        <View className="gap-4">
          <ChecklistItemCard title="Trade per quote" status="$5,000" />
          <ChecklistItemCard title="Withdrawal request" status="$2,500" />
          <ChecklistItemCard title="Daily withdrawal" status="$10,000" />
        </View>
      </View>
      <Cta
        label={'Start trading'}
        onPress={() => router.push('/home/trades')}
      />
    </>
  );
};

export default Approved;

import TextCustom from '@/components/ui/text';
import CheckIcon from '@/screens/kyc/approved/assets/icons/check-icon.svg';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import ChecklistItemCard from '../components/checklist-item-card';
import CircleIndicator from '../components/circle-indicator';
import Cta from '../components/cta';

const Approved = () => {
  const router = useRouter();

  return (
    <>
      <View className="gap-16">
        <View className="gap-6">
          <CircleIndicator floatingCircleClassName="bg-primary-2">
            <CheckIcon />
          </CircleIndicator>
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

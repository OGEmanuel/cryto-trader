import RevampedWrapper from '@/components/revamped-wrapper';
import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import Checklists from './checklists';
import ProgressIndicator from './components/progress-indicator';
import IntroCard from './intro-card';

const KycScreen = () => {
  return (
    <RevampedWrapper
      header="Verify to unlock limits"
      description="Complete identity verification from inside the app before high-value trading or withdrawals."
      goBackTo={'/home'}
    >
      <View className="android:pb-7 flex-1 pt-7">
        <ProgressIndicator />
        <View className="flex-1 justify-between pt-7">
          <View className="gap-8">
            <IntroCard />
            <Checklists />
          </View>
          <View className="gap-4">
            <Button label="Start verification" />
            <TextCustom className="text-center text-[10px]/[130%] text-custom-text-tertiary">
              You can continue browsing markets without verification.
            </TextCustom>
          </View>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default KycScreen;

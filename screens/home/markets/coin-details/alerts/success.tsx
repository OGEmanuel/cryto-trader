import RevampedWrapper from '@/components/revamped-wrapper';
import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import ItemCard from '@/screens/home/components/item-card';
import SuccessSymbol from '@/screens/home/components/success-symbol';
import { View } from 'react-native';

const SuccessScreen = () => {
  return (
    <RevampedWrapper
      header="Alert created"
      description="We will notify you when the target is reached."
    >
      <View className="gap-12 pt-10">
        <View className="gap-[3.75rem]">
          <View className="gap-8">
            <SuccessSymbol />
            <View className="items-center gap-5">
              <TextCustom className="text-center font-nm-bold text-[22px]/[130%] text-custom-text-secondary">
                BTC above $72,000
              </TextCustom>
              <TextCustom className="w-full max-w-[17.875rem] text-center text-sm/[130%] text-custom-text-tertiary">
                This alert appears in Profile → Price Alerts and can be edited
                or deleted.
              </TextCustom>
            </View>
          </View>
          <View className="gap-3">
            <ItemCard name="Asset" value="BTC" />
            <ItemCard name="Direction" value="Above" />
            <ItemCard name="Target" value="$72,000" />
          </View>
        </View>
        <Button label="View alerts" />
      </View>
    </RevampedWrapper>
  );
};

export default SuccessScreen;

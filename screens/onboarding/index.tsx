import Button from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { cn, getFullWidth } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import Step1Icon from './assets/icons/step-1-icon.svg';
import Step2Icon from './assets/icons/step-2-icon.svg';
import Step3Icon from './assets/icons/step-3-icon.svg';
import StepWrapper from './step-wrapper';

const INFO = [
  {
    id: 1,
    title: 'Trade anytime anywhere',
    illustration: <Step1Icon />,
  },
  {
    id: 2,
    title: 'Save and invest at the same time',
    illustration: <Step2Icon />,
  },
  {
    id: 3,
    title: 'Transact fast and easy',
    illustration: <Step3Icon />,
  },
];

const OnboardingScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState<number>(0);
  const router = useRouter();

  const handleScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    const position = e.nativeEvent.contentOffset.x;
    setPage(Math.round(position / getFullWidth()));
  };

  const scrollToPage = (index: number): void => {
    scrollRef.current?.scrollTo({
      x: index * getFullWidth(),
      animated: true,
    });
  };

  const goToNextPage = (): void => {
    if (page === INFO.length - 1) {
      router.push('/auth');
      return;
    }
    scrollToPage(page + 1);
  };

  return (
    <View className="relative flex-1">
      <ImageBackground
        source={require('./assets/img/Background.png')}
        className="absolute size-full"
      />

      <View className="gap-10">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {INFO.map(info => (
            <StepWrapper key={info.id} title={info.title}>
              {info.illustration}
            </StepWrapper>
          ))}
        </ScrollView>
        <View className="items-center">
          <View className="flex-row gap-2">
            {INFO.map((_, i) => (
              <View
                key={i}
                className={cn(
                  ' size-[0.765rem] rounded-full',
                  i === page ? 'bg-tertiary' : 'bg-secondary',
                )}
              ></View>
            ))}
          </View>
        </View>
        <Button
          onPress={goToNextPage}
          style={{
            shadowColor: Colors.light.primary,
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            elevation: 10,
          }}
          label={page === INFO.length - 1 ? 'Get started' : 'Next'}
          className="w-[11.25rem] self-center"
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

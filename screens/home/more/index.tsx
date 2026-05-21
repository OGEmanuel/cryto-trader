import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageWrapper from '../components/page-wrapper';
import Common from './common';
import Finance from './finance';
import Header from './header';
import Trade from './trade';

const MoreScreen = () => {
  return (
    <PageWrapper>
      <SafeAreaView className="android:pt-[2.3125rem] flex-1">
        <Header />
        <ScrollView className="pt-[3.75rem]">
          <View className="android:pb-52 ios:pb-40 gap-10 px-6">
            <Common />
            <Trade />
            <Finance />
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageWrapper>
  );
};

export default MoreScreen;

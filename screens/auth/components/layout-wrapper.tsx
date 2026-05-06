import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LayoutWrapper = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <View className="relative flex-1">
      <ImageBackground
        source={require('../assets/img/Background.png')}
        className="absolute size-full"
      />
      <SafeAreaView className="android:pt-[2.3125rem] flex-1">
        {children}
      </SafeAreaView>
    </View>
  );
};

export default LayoutWrapper;

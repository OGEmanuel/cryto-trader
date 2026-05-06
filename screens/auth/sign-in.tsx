import TextCustom from '@/components/ui/text';
import { Pressable, View } from 'react-native';
import FingerprintIcon from './assets/icons/fingerprint-icon.svg';
import AuthForm from './components/form';
import PageWrapper from './components/tab-wrapper';

const SignIn = () => {
  return (
    <PageWrapper title="Sign in">
      <View className="gap-[3.4375rem]">
        <AuthForm />
        <View className="flex-row justify-center">
          <Pressable className="items-center gap-5 active:opacity-75">
            <FingerprintIcon />
            <TextCustom className="text-custom-text-2 text-sm/[100%]">
              Use fingerprint instead?
            </TextCustom>
          </Pressable>
        </View>
      </View>
    </PageWrapper>
  );
};

export default SignIn;

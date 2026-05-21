import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { Link, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import Header from '../components/header';
import PageWrapper from '../components/page-wrapper';
import QrCodeIcon from './assets/icons/qr-code.svg';
import Camera from './camera';
import SectionHeader from './header';

const ScanScreen = () => {
  const router = useRouter();

  return (
    <PageWrapper>
      <Header />
      <View className="p-6">
        <View className="gap-5">
          <View className="gap-4">
            <SectionHeader />
            <Camera />
          </View>
          <View className="gap-6">
            <View className="gap-5">
              <Link href={'/home/qr-code'} asChild>
                <Pressable className="h-[3.375rem] flex-row items-center justify-center gap-[10px] rounded-2xl bg-primary active:opacity-75">
                  <QrCodeIcon />
                  <TextCustom>Show QR code</TextCustom>
                </Pressable>
              </Link>
              <Button
                onPress={() => router.back()}
                label="Cancel"
                variant="secondary"
              />
            </View>
            <View className="border border-tertiary" />
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};

export default ScanScreen;

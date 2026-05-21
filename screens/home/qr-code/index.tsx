import TextCustom from '@/components/ui/text';
import { Link, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import Header from '../components/header';
import PageWrapper from '../components/page-wrapper';
import CameraIcon from '../scan/assets/icons/camera';
import SectionHeader from './header';
import QrSection from './qr-section';

const QrCodeScreen = () => {
  const router = useRouter();

  return (
    <PageWrapper>
      <Header />
      <SectionHeader />
      <QrSection />
      <View className="gap-5 px-6">
        <TextCustom className="w-[19.3125rem] self-center text-center text-sm/5 text-secondary">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore
        </TextCustom>
        <Link href={'/home/scan'} asChild>
          <Pressable className="flex-row items-center justify-center gap-[10px] rounded-2xl border border-primary py-4 active:opacity-75">
            <CameraIcon size="22" />
            <TextCustom className="text-lg/[100%] text-primary">
              Scan QR Code
            </TextCustom>
          </Pressable>
        </Link>
      </View>
    </PageWrapper>
  );
};

export default QrCodeScreen;

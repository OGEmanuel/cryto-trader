import { Colors } from '@/constants/theme';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Image, Platform, Pressable, View } from 'react-native';
import NotificationIcon from '../assets/icons/notification.svg';
import ScannerIcon from '../assets/icons/scanner.svg';
import SearchIcon from '../assets/icons/search.svg';

const Header = () => {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View
      style={{
        shadowColor: Colors.light['background-2'],
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 12,
      }}
      className="flex-row items-center justify-between bg-background-2 pb-[14px] pl-6 pr-[14px] pt-20"
    >
      <View className="size-9 overflow-hidden rounded-full">
        <Image
          source={require('../assets/img/avatar.jpg')}
          className="size-full"
        />
      </View>
      <View className="flex-row items-center gap-2">
        <View className="size-11 items-center justify-center">
          <SearchIcon />
        </View>
        <Pressable
          onPress={() => router.push('/home/scan')}
          disabled={Platform.OS === 'android' ? !isPermissionGranted : false}
          className="size-11 items-center justify-center active:opacity-75"
        >
          <ScannerIcon />
        </Pressable>
        <View className="size-11 items-center justify-center">
          <NotificationIcon />
        </View>
      </View>
    </View>
  );
};

export default Header;

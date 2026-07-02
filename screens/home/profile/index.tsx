import RevampedWrapper from '@/components/revamped-wrapper';
import Button from '@/components/ui/button';
import { useLogoutMutation } from '@/services/auth';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import Options from './options';
import User from './user';

const ProfileScreen = () => {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();

      await SecureStore.deleteItemAsync('accessToken');

      await SecureStore.deleteItemAsync('refreshToken');

      await SecureStore.deleteItemAsync('expiresAt');

      router.replace('/auth');
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';
      console.log(message);

      Toast.show({
        type: 'error',
        text1: 'Logout failed!',
        text2: message,
      });
    }
  };

  return (
    <RevampedWrapper header="Profile">
      <View className="flex-1 gap-[7rem]">
        <View className="gap-10">
          <User />
          <Options />
        </View>
        <Button
          label="Logout"
          onPress={() => handleLogout()}
          isPending={isLoading}
          className="bg-background"
          labelClassName="text-custom-extra"
        />
      </View>
    </RevampedWrapper>
  );
};

export default ProfileScreen;

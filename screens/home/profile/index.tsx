import Button from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import RevampedWrapper from '@/components/revamped-wrapper';
import Options from './options';
import User from './user';

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <RevampedWrapper header="Profile">
      <View className="flex-1 gap-[7rem]">
        <View className="gap-10">
          <User />
          <Options />
        </View>
        <Button
          label="Logout"
          onPress={() => router.replace('/auth')}
          className="bg-background"
          labelClassName="text-custom-extra"
        />
      </View>
    </RevampedWrapper>
  );
};

export default ProfileScreen;

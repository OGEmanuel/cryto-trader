import ArrowIcon from '@/assets/icons/arrow-icon.svg';
import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import CopyIcon from '../assets/icons/copy.svg';
import MoreIcon from '../assets/icons/more-icon.svg';

const Header = () => {
  const router = useRouter();

  return (
    <View className="relative overflow-hidden pb-5">
      <View className="ios:-bottom-16 android:-bottom-20 absolute h-full w-full">
        <LinearGradient
          colors={['rgba(27, 35, 42, 0)', Colors.light.primary]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="size-full"
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      </View>
      <View className="gap-7 px-6">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <View className="size-11 items-center justify-center">
              <ArrowIcon />
            </View>
            <TextCustom className="font-nm-bold text-lg/[100%] text-white">
              Menu
            </TextCustom>
          </Pressable>
          <MoreIcon />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-[11px]">
            <View className="relative size-11">
              <View className="overflow-hidden rounded-full border border-white">
                <Image
                  source={require('../assets/img/avatar.jpg')}
                  className="size-full"
                />
              </View>
              <View className="bg-notify absolute bottom-0 right-[6px] size-2 rounded-full border border-white">
                <View></View>
              </View>
            </View>
            <View className="gap-1">
              <TextCustom className="font-nm-bold text-lg/[100%] text-white">
                User 1234
              </TextCustom>
              <View className="flex-row items-center gap-[6px]">
                <TextCustom className="text-sm/[100%] text-secondary">
                  ID: 1234567890
                </TextCustom>
                <CopyIcon />
              </View>
            </View>
          </View>
          <Button
            label="Edit Profile"
            className="rounded-full px-[1.125rem]"
            style={{
              shadowColor: Colors.light.primary,
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.16,
              shadowRadius: 15,
              elevation: 12,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

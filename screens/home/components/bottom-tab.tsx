import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { cn } from '@/lib/utils';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { View } from 'react-native';
import ActivityIcon from '../assets/icons/activity';
import HomeIcon from '../assets/icons/home';
import MarketIcon from '../assets/icons/markets';
import TradesIcon from '../assets/icons/trades';
import WalletsIcon from '../assets/icons/wallets';

export default function BottomTab({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();

  const icon = {
    index: (props: any) => <HomeIcon {...props} />,
    markets: (props: any) => <MarketIcon {...props} />,
    trades: (props: any) => <TradesIcon {...props} />,
    activity: (props: any) => <ActivityIcon {...props} />,
    wallets: (props: any) => <WalletsIcon {...props} />,
  };

  type IconName = keyof typeof icon;

  return (
    <View
      className="absolute bottom-6 mx-6 flex-row items-center justify-between rounded-[20px] bg-background p-4"
      style={{
        shadowColor: Colors.light['background-2'],
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.5,
        shadowRadius: 25,
        elevation: 12,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center gap-3"
          >
            {icon[route.name as IconName]({
              fill: isFocused ? Colors.light.primary : Colors.light.secondary,
              style: {
                shadowColor: isFocused ? Colors.light.primary : undefined,
                shadowOffset: isFocused
                  ? {
                      width: 0,
                      height: 5,
                    }
                  : undefined,
                shadowOpacity: isFocused ? 0.25 : undefined,
                shadowRadius: isFocused ? 8 : undefined,
                elevation: isFocused ? 5 : undefined,
              },
            })}
            <TextCustom
              className={cn(
                'text-xs/[100%]',
                isFocused ? 'text-custom-text' : 'text-secondary',
              )}
            >
              {label as string}
            </TextCustom>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

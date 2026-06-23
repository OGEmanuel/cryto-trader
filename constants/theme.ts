/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // text: '#11181C',
    // background: '#fff',
    // tint: tintColorLight,
    // icon: '#687076',
    // tabIconDefault: '#687076',
    // tabIconSelected: tintColorLight,
    primary: '#5ED5A8',
    'primary-2': '#5CD6A5',
    background: '#1B232A',
    'background-2': '#161C22',
    'background-3': '#1B1F27',
    'custom-text-3': '#080C11',
    'background-secondary': '#083D2B',
    'background-tertiary': '#141820',
    'custom-text-secondary': '#F1F6F8',
    'custom-text': '#C1C7CD',
    'custom-text-2': '#A7AFB7',
    'custom-text-tertiary': '#8594A6',
    secondary: '#777777',
    'secondary-2': '#29333D',
    tertiary: '#252E35',
    foreground: '#171D22',
    extra: '#E3E8ED',
    'custom-extra': '#F1F6F8',
    destructive: '#DD4B4B',
    'destructive-2': '#E4484C',
    'destructive-3': '#E45252',
    notify: '#4AA8FF',
    warning: '#D5BB5E',
    'warning-2': '#2B2416',
    'warning-3': '#C9A96C',
    'warning-4': '#DB9E38',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

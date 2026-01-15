/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#000000', // Black
    background: '#FFFFFF', // White
    tint: '#CC0000', // CNN Red
    icon: '#262626', // Dark Gray
    tabIconDefault: '#888888', // Gray
    tabIconSelected: '#CC0000', // CNN Red
    primary: '#CC0000', // CNN Red
    secondary: '#262626', // Dark Gray header
    error: '#CC0000', // Red
    card: '#F6F6F6', // Light Gray
    border: '#E6E6E6', // Light Border
  },
  dark: {
    text: '#F0F0F0', // Off-white
    background: '#111111', // Almost Black (CNN Dark Mode style)
    tint: '#CC0000', // CNN Red
    icon: '#AAAAAA', // Light Gray
    tabIconDefault: '#555555',
    tabIconSelected: '#CC0000',
    primary: '#CC0000',
    secondary: '#FFFFFF',
    error: '#FF4444',
    card: '#1F1F1F',
    border: '#333333',
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
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

import { NativeModules, Platform } from 'react-native';

const { PlatformModule } = NativeModules;

export const isMacCatalyst =
  Platform.OS === 'ios' && PlatformModule?.isMacCatalyst === true;

export const isAndroid = Platform.OS === 'android';

export const isWindows = Platform.OS === 'windows';

export const isDesktop = isMacCatalyst || isWindows;

export const getBuildNumber = (): string => {
  if (Platform.OS === 'ios') {
    return PlatformModule?.buildNumber ?? '';
  }
  return '';
};

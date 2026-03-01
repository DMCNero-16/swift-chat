import { HapticFeedbackTypes } from 'react-native-haptic-feedback/src/types.ts';
import { Platform } from 'react-native';
import {
  getHapticEnabled,
  saveHapticEnabled,
} from '../../storage/StorageUtils.ts';
import { isMac } from '../../App.tsx';

/* eslint-disable @typescript-eslint/no-var-requires */
const ReactNativeHapticFeedback =
  Platform.OS !== 'windows'
    ? require('react-native-haptic-feedback').default
    : null;
/* eslint-enable @typescript-eslint/no-var-requires */

let hapticFeedbackEnabled = getHapticEnabled();

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export function setHapticFeedbackEnabled(isEnabled: boolean) {
  hapticFeedbackEnabled = isEnabled;
  saveHapticEnabled(isEnabled);
}

export function trigger(method: HapticFeedbackTypes) {
  if (isMac || !hapticFeedbackEnabled) {
    return;
  }
  if (method === HapticFeedbackTypes.selection && Platform.OS === 'android') {
    method = HapticFeedbackTypes.soft;
  }
  ReactNativeHapticFeedback?.trigger(method, hapticOptions);
}

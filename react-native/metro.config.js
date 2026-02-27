// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

let windowsConfig = {};
try {
  const {
    getDefaultConfig: getDefaultWindowsConfig,
  } = require('@react-native-windows/metro-config');
  windowsConfig = getDefaultWindowsConfig(__dirname);
} catch (_) {
  // @react-native-windows/metro-config not available on non-Windows platforms
}

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  windowsConfig,
  config
);

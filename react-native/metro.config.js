// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// Modules that are incompatible with Windows and should resolve to an empty module
const windowsBlockedModules = [
  'react-native-math-view',
  'react-native-haptic-feedback',
  'react-native-compressor',
  'react-native-image-picker',
  '@sayem314/react-native-keep-awake',
  'react-native-file-viewer',
  'react-native-share',
  'react-native-document-picker',
  'react-native-fs',
];

const emptyModule = path.resolve(__dirname, 'windows-empty-module.js');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (
        platform === 'windows' &&
        windowsBlockedModules.some(
          m => moduleName === m || moduleName.startsWith(m + '/')
        )
      ) {
        return { type: 'sourceFile', filePath: emptyModule };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

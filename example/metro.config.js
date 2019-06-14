/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
// const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  // resolver: {
  //   blacklistRE: blacklist([
  //     new RegExp(
  //       `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`
  //     ),
  //   ]),
  //   providesModuleNodeModules: [
  //     '@babel/runtime',
  //     'react',
  //     'react-native',
  //     'prop-types',
  //     'react-native-webview',
  //     'query-string',
  //   ],
  // },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: [
    // path.resolve(__dirname, './'),
    // path.resolve(__dirname, './node_modules/react-native'),
    path.resolve(__dirname, '../'),
  ],
};

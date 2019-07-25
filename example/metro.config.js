/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');
const package = require('../package.json');
const peerDependencies = Object.keys(package.peerDependencies);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: [
    path.resolve(__dirname, '../'),
  ],
  resolver: {
    blacklistRE: blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`
      ),
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'exampleForWebView/node_modules'))}\\/.*$`
      ),
    ]),
    providesModuleNodeModules: [...peerDependencies],
  },
};
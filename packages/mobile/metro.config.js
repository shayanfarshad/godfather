/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path");

module.exports = {
  resolver: {
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx'],
  },
  transformer: {
    projectRoot: path.resolve(__dirname, "../../"),
    watchFolders: [path.resolve(__dirname, "../../")],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

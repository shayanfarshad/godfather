module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            src: './src',            // ✅ alias اصلی
            // (اختیاری) میان‌بُرهای رایج:
            '@app': './src/app',
            '@assets': './src/assets',
            '@screens': './src/app/screens',
            '@store': './src/app/store',
            '@theme': './src/app/theme'
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        }
      ],
      'react-native-reanimated/plugin',
  ],
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
          'react-native-reanimated/plugin', {
              relativeSourceLocation: true,
          },
      ]
  ]
  };
};

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       [
//           'react-native-reanimated/plugin', {
//               relativeSourceLocation: true,
//           },
//       ]
//   ],
//     // plugins: [
//     //   // 'react-native-reanimated/plugin',
//     //   "react-native-reanimated/plugin",
//     //   {
//     //     relativeSourceLocation: true,
//     //   },
//     // ],
//   };
// };

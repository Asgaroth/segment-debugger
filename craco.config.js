module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return env === 'development'
        ? { ...webpackConfig }
        : {
            ...webpackConfig,
            entry: {
              main: [
                env === 'development' &&
                  require.resolve('react-dev-utils/webpackHotDevClient'),
                paths.appIndexJs,
              ].filter(Boolean),
              devtools: './src/devtools.ts',
            },
            output: {
              ...webpackConfig.output,
              filename: 'static/js/[name].js',
            },
            optimization: {
              ...webpackConfig.optimization,
              runtimeChunk: false,
            },
          };
    },
  },
};

import { withNativeFederation, shareAll } from '@softarc/native-federation/config';
import { REACT_SKIP_LIST } from '@softarc/native-federation-esbuild/frameworks/react';

export default withNativeFederation({
  name: 'orders',

  exposes: {
    './Bootstrap': './src/bootstrap.tsx',
  },

  shared: {
    ...shareAll(
      {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      },
      {
        skipList: REACT_SKIP_LIST,
        overrides: {
          react: {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            includeSecondaries: { keepAll: true },
          },
          'react-dom': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            includeSecondaries: { keepAll: true },
          },
        },
      },
    ),
  },

  features: {
    ignoreUnusedDeps: true,
  },
});

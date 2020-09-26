import {defineConfig} from 'dumi'

// more config: https://d.umijs.org/config
export default defineConfig({
  title: '@magicdawn/x',
  favicon: 'https://cdn.jsdelivr.net/gh/magicdawn/magicdawn@master/images/x-logo.png',
  logo: 'https://cdn.jsdelivr.net/gh/magicdawn/magicdawn@master/images/x-logo.png',
  outputPath: 'docs-dist',
  mode: 'site',

  resolve: {
    includes: ['docs', 'react', 'rematch'],
  },

  navs: [
    //
    null,
    {title: 'GitHub', path: 'https://github.com/magicdawn/x'},
  ],

  menus: {
    '/react': [
      {
        title: 'hooks',
        children: ['react/hooks/useModifyState', 'react/hooks/useShallowEqualSelector'],
      },
    ],
    '/rematch': [
      {
        title: 'plugin',
        children: ['rematch/statePlugin', 'rematch/listenPlugin'],
      },
      {
        title: 'hooks',
        children: ['rematch/usePlug'],
      },
    ],
  },
})

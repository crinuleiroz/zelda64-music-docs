import type { Config, PluginOptions } from '@docusaurus/types';
import * as PluginContentDocs from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import PrismLight from './src/utils/prismLight';
import PrismDark from './src/utils/prismDark';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const commonPluginOptions: PluginContentDocs.Options = {
  breadcrumbs: true,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
};

const config: Config =
{
  title: 'Zelda64 Music Documentation',
  tagline: 'Comprehensive music resource for Zelda64',
  favicon: 'img/favicon.png',
  url: 'https://crinuleiroz.github.io',
  // baseUrl: '/',
  baseUrl: '/zelda64-music-docs/',
  organizationName: 'crinuleiroz',
  projectName: 'zelda64-music-docs',
  // deploymentBranch: 'main',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  future:
  {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n:
  {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Presets
  presets:
  [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars'),
          ...commonPluginOptions,
        },
        blog: false,
        theme:
        {
          customCss: require.resolve('./src/css/custom.css')
        },
      } satisfies Preset.Options,
    ],
  ],

  // PLugins
  plugins:
  [
    // MIDI Tab
    [
      'content-docs',
      {
        id: 'midi',
        path: 'midi',
        routeBasePath: 'midi',
        sidebarPath: require.resolve('./sidebarsMidi'),
        ...commonPluginOptions,
      } satisfies PluginContentDocs.Options,
    ],

    // Getting Started Tab
    [
      'content-docs',
      {
        id: 'gettingStarted',
        path: 'getting-started',
        routeBasePath: 'getting-started',
        sidebarPath: require.resolve('./sidebarsGettingStarted'),
        ...commonPluginOptions,
      } satisfies PluginContentDocs.Options,
    ],

    // Tools Tab
    [
      'content-docs',
      {
        id: 'tools',
        path: 'tools',
        routeBasePath: 'tools',
        sidebarPath: require.resolve('./sidebarsTools'),
        ...commonPluginOptions,
      } satisfies PluginContentDocs.Options,
    ],

    // Guides Tab
    [
      'content-docs',
      {
        id: 'guides',
        path: 'guides',
        routeBasePath: 'guides',
        sidebarPath: require.resolve('./sidebarsGuides'),
        ...commonPluginOptions,
      } satisfies PluginContentDocs.Options,
    ],

    // Instrument Bank Game Data
    [
      'content-docs',
      {
        id: 'instrumentBanks',
        path: 'game-reference/banks',
        routeBasePath: 'game-data',
        sidebarPath: require.resolve('./sidebarsInstrumentBanks'),
        ...commonPluginOptions,
      } satisfies PluginContentDocs.Options,
    ],

    // Aseq Message Data
    [
      'content-docs',
      {
        id: 'aseqMessages',
        path: 'game-reference/aseq',
        routeBasePath: 'game-data/aseq',
        sidebarPath: require.resolve('./sidebarsAseqMessages'),
        ...commonPluginOptions,
      } satisfies PluginContentDocs.Options,
    ],
  ],

  // Themeing
  themeConfig:
  {
    colorMode:
    {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism:
    {
      defaultLanguage: 'markdown',
      theme: PrismLight,
      darkTheme: PrismDark,
      additionalLanguages:
      [
        'c',
        'clike',
        'python'
      ],
      // magicComments: [
      //   {
      //     className: 'theme-code-block-highlighted-line',
      //     line: 'highlight-next-line',
      //     block: {start: 'highlight-start', end: 'highlight-end'},
      //   },
      //   {
      //     className: 'code-add-line',
      //     line: 'highlight-add-next-line',
      //     block: {start: 'highlight-add-start', end: 'highlight-add-end'},
      //   },
      //   {
      //     className: 'code-remove-line',
      //     line: 'highlight-remove-next-line',
      //     block: {
      //       start: 'highlight-remove-start',
      //       end: 'highlight-remove-end',
      //     },
      //   },
      // ],
    },

    // Navbar
    navbar:
    {
      title: 'Zelda64 Music Docs',
      logo:
      {
        src: 'img/favicon.png',
        alt: 'Logo',
      },
      style: 'dark',
      items:
      [
        // Getting Started Tab
        {
          label: 'Getting Started',
          type: 'doc',
          docId: 'glossary',
          position: 'left',
          docsPluginId: 'gettingStarted',
        },

        // Documentation Tab
        {
          label: 'Documentation',
          type: 'doc',
          docId: 'audio-sequences/limitations',
          position: 'left',
        },

        {
          label: 'Resources',
          type: 'dropdown',
          position: 'left',
          items:
          [
            // Tools
            {
              label: 'Tools',
              type: 'doc',
              docId: 'rom',
              docsPluginId: 'tools',
            },

            // Guides
            {
              label: 'Guides',
              type: 'doc',
              docId: 'seq64/errors',
              docsPluginId: 'guides',
            },

            // MIDI
            {
              label: 'MIDI',
              type: 'doc',
              docId: 'sysex/index',
              docsPluginId: 'midi',
            },
          ],
        },

        // Vanilla Data Reference
        {
          label: 'Game Data Reference',
          type: 'dropdown',
          position: 'right',
          items: [
            {
              label: 'Instrument Bank Data',
              type: 'doc',
              docId: 'index',
              docsPluginId: 'instrumentBanks',
            },
            {
              label: 'ASEQ Message Data',
              type: 'doc',
              docId: 'message-format',
              docsPluginId: 'aseqMessages',
            },
            // {
            //   label: 'ASEQ Message Format',
            //   type: 'doc',
            //   docId: 'message-format',
            //   docsPluginId: 'aseqMessages',
            // },
            // {
            //   label: 'ASEQ Control Flow Messages',
            //   type: 'doc',
            //   docId: 'control-flow/RBLTZ',
            //   docsPluginId: 'aseqMessages',
            // },
            // {
            //   label: 'ASEQ Header Messages',
            //   type: 'doc',
            //   docId: 'header/TESTCHAN',
            //   docsPluginId: 'aseqMessages',
            // },
            // {
            //   label: 'ASEQ Channel Messages',
            //   type: 'doc',
            //   docId: 'message-format',
            //   docsPluginId: 'aseqMessages',
            // },
            // {
            //   label: 'ASEQ Note Layer Messages',
            //   type: 'doc',
            //   docId: 'layer/NOTEDVG',
            //   docsPluginId: 'aseqMessages',
            // },
          ],
        },
      ],
    },

    // Footer
    footer: {
      style: 'dark',
      links:
      [
        // Site Links
        {
          title: 'Resources',
          items: [
            // Guides
            {
              label: 'Guides',
              to: 'guides/seq64/errors',
            },

            // Tools
            {
              label: 'Tools',
              to: 'tools/rom',
            },

            // MIDI
            {
              label: 'MIDI',
              to: 'midi/sysex',
            },

            // Documentation
            // {
            //   label: 'Documentation',
            //   to: 'audio-sequences/limitations',
            // },
          ],
        },

        // Communities
        // {
        //   title: 'Communities',
        //   items:
        //   [
        //     {
        //       label: 'Ocarina of Time Randomizer',
        //       href: 'https://github.com/crinuleiroz',
        //     },
        //     {
        //       label: 'Majora\'s Mask Randomizer',
        //       href: 'https://github.com/crinuleiroz',
        //     },
        //     {
        //       label: 'OOTxMM Randomizer',
        //       href: 'https://github.com/crinuleiroz',
        //     },
        //   ],
        // },

        // ZeldaRET Sources
        {
          title: 'ZeldaRET',
          items:
          [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/DqwyCBYKqf/',
            },
            {
              label: 'Ocarina of Time Decompilation',
              href: 'https://github.com/zeldaret/oot',
            },
            {
              label: 'Majora\'s Mask Decompilation',
              href: 'https://github.com/zeldaret/mm',
            },
          ],
        },
      ],

      // Copyright
      copyright: `Copyright © ${new Date().getFullYear()} Crinuleiroz`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
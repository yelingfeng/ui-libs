import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
export default defineConfig({
  title: 'UI-libs基础组件文档',
  description: '基于Pandora 基础组件封装使用',
  lang: 'cn-ZH',
  base: '/ui-libs/',
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    siteTitle: 'UI-libs基础组件文档',
    outline: 3,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yelingfeng/ui-libs' },
    ],
    nav: [
      {
        text: '安装指南',
        link: '/components/',
      },
      { text: '基础组件', link: '/components/TSelect/base.md' },
      {
        text: 'GitHub地址',
        link: 'https://github.com/yelingfeng/ui-libs',
      },
    ],
    sidebar: {
      '/components': [
        {
          text: '常用组件',
          items: [
            { text: '下拉选择组件', link: '/components/TSelect/base.md' },
            { text: '详情组件', link: '/components/TDetail/base.md' },
            { text: 'Button组件', link: '/components/TButton/base.md' },
            { text: 'Radio组件', link: '/components/TRadio/base.md' },
            { text: '日期组件', link: '/components/TDatePicker/base.md' },
            { text: '步骤组件', link: '/components/TStepWizard/base.md' },
          ],
        },
        {
          text: '复杂组件',
          items: [
            {
              text: '下拉选择表格组件',
              link: '/components/TSelectTable/base.md',
            },
            {
              text: 'TAdaptivePage组件',
              link: '/components/TAdaptivePage/base.md',
            },
            {
              text: '条件查询组件',
              link: '/components/TQueryCondition/base.md',
            },
            { text: '表单组件', link: '/components/TForm/base.md' },
            { text: '模块表单组件', link: '/components/TModuleForm/base.md' },
            { text: 'table组件', link: '/components/TTable/base.md' },
          ],
        },
      ],
    },
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})

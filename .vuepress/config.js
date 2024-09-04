import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  base: '/tron-energy-doc/',
  // title: '开发文档 V2023.05',
  // description: '简单、易用的TRON能量购买平台',
  head: [
    ['link', { rel: 'icon', href: '/tron-energy-doc/images/logo.png' }],
    ['link', { rel: 'canonical', href: 'https://itrx.io' }],
    ['meta', { name: 'yandex-verification', content: '512d0ae5e3361304' }],
    ['link', { hreflang: 'en', href: '/tron-energy-doc/' }],
    ['link', { hreflang: 'ru', href: '/tron-energy-doc/ru/' }],
    ['link', { hreflang: 'zh-Hans', href: '/tron-energy-doc/zh/' }],
  ],

  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    // '/en/': {
    //   lang: 'en-US',
    //   title: ' develop doc V2023.05',
    //   description: ' develop doc',
    // },
    '/': {
      lang: 'en-US',
      // selectLanguageName: 'English',
      title: 'Buy/Rent Tron Energy Documentation',
      description: 'Provides Tron energy leasing services, buying Tron energy, purchasing TRX energy, acquiring TRX energy, and resolving insufficient TRX transaction fees'
    },
    '/zh/': {
      lang: 'zh-CN',
      // selectLanguageName: '简体中文',
      title: '购买/租用波场能量文档',
      description: '提供波场能量租赁服务, 购买波场能量, trx能量购买, 获得trx能量, 解决trx手续费不足'
    },
    '/ru/': {
      lang: 'ru-RU',
      // selectLanguageName: '简体中文',
      title: 'Покупка/Аренда Энергии Трон Документация',
      description: 'Предоставление услуг по аренде энергии Трон, покупка энергии Трон, покупка энергии TRX, получение энергии TRX, решение проблем с недостаточной комиссией за транзакции TRX'
    },
  },

  theme: defaultTheme({
    // 默认主题配置
    logo: '/images/logo.png',
    contributors: false,
    // navbar: [
    //     {
    //         text: '语言',
    //         children: ['README.md']
    //     }
    // ],
    smoothScroll: true,
    locales: {
      '/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        sidebar: [
          {
            text: 'Prepare',
            link: '/100-before'
          },
          {
              text: 'General',
              link: '/general',
              children: ['/general/sign', '/general/error-code', '/general/callback'],
              
          },
          {
              text: 'API',
              link: '/api',
              children: [
                '/api/index-data', 
                '/api/order-create', 
                '/api/order-transfer-trx', 
                '/api/order-count-policy', 
                '/api/order-auto-policy', 
                '/api/order-query', 
                '/api/order-recliam', 
                '/api/order-price', 
                '/api/order-process', 
                '/api/order-expiring',
                '/api/api-summary',
              ],
          },
          {
            text: 'Others',
            link: '/other',
            children: ['/other/auto', '/api/order-collect'],
          }
        ]
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        sidebar: [
          {
            text: '接入前',
            link: '/zh/100-before'
          },
          {
              text: '说明',
              link: '/zh/general',
              children: ['/zh/general/sign', '/zh/general/error-code', '/zh/general/callback'],
              
          },
          {
              text: '接口',
              link: '/zh/api',
              children: [
                '/zh/api/index-data', 
                '/zh/api/order-create', 
                '/zh/api/order-transfer-trx', 
                '/zh/api/order-count-policy', 
                '/zh/api/order-auto-policy', 
                '/zh/api/order-query', 
                '/zh/api/order-recliam', 
                '/zh/api/order-price', 
                '/zh/api/order-process', 
                '/zh/api/order-expiring',
                '/zh/api/api-summary',
              ],
          },
          {
            text: '其他说明',
            link: '/zh/other',
            children: ['/zh/other/auto', '/zh/api/order-collect'],
          }
        ]
      },
      '/ru/': {
        selectLanguageName: 'Русский',
        selectLanguageText: 'Выберите язык',
        sidebar: [
          {
            text: 'Подготовить',
            link: '/ru/100-before'
          },
          {
              text: 'Уведомление',
              link: '/ru/general',
              children: ['/ru/general/sign', '/ru/general/error-code', '/ru/general/callback'],
              
          },
          {
              text: 'интерфейс',
              link: '/ru/api',
              children: [
                '/ru/api/index-data', 
                '/ru/api/order-create', 
                '/ru/api/order-transfer-trx', 
                '/ru/api/order-count-policy', 
                '/ru/api/order-auto-policy', 
                '/ru/api/order-query', 
                '/ru/api/order-recliam', 
                '/ru/api/order-price', 
                '/ru/api/order-process', 
                '/ru/api/order-expiring',
                '/ru/api/api-summary',
              ],
          },
          {
            text: 'другие инструкции',
            link: '/ru/other',
            children: ['/ru/other/auto', '/ru/api/order-collect'],
          }
        ]
      },
    },
  }),
  
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@/plugins/hreflang']
  ]
})

/*

<CodeGroup>
  <CodeGroupItem title="Python" active>

```python

```

  </CodeGroupItem>

  <CodeGroupItem title="Php">

```php

```

  </CodeGroupItem>

  <CodeGroupItem title="Java">
  
```java

```

  </CodeGroupItem>

  <CodeGroupItem title="Go">
  
```go

```
  </CodeGroupItem>

  <CodeGroupItem title="Shell">
  
```shell

```
  </CodeGroupItem>
</CodeGroup>

*/
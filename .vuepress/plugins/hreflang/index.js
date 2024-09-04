// .vuepress/plugins/hreflang/index.js
module.exports = (options, context) => ({
    extendPageData($page) {
      const { regularPath, frontmatter } = $page;
  
      const defaultSiteUrl = 'https://develop.{domain}'; // 默认网站URL
      const hreflangs = {
        'en': '',
        'ru': 'ru',
        'zh-Hans': 'zh'
      };
  
      $page.frontmatter.head = $page.frontmatter.head || [];
      // 为每种语言生成并添加 hreflang 标签
      for (const [lang, pathPrefix] of Object.entries(hreflangs)) {
        $page.frontmatter.head.push([
          'link', {
            rel: 'alternate',
            hreflang: lang,
            href: `${defaultSiteUrl}/${pathPrefix}${regularPath}`
          }
        ]);
      }
    }
  });
  
export const data = JSON.parse("{\"key\":\"v-2841d02a\",\"path\":\"/en/general/page1.html\",\"title\":\"说明1\",\"lang\":\"en-US\",\"frontmatter\":{\"lang\":\"en-US\",\"title\":\"说明1\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"en/general/page1.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

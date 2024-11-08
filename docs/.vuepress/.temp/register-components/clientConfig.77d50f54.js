import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("indexview", defineAsyncComponent(() => import("E:/www/doc/docs/.vuepress/components/indexview.vue")))
    
      app.component("Layout", defineAsyncComponent(() => import("E:/www/doc/docs/.vuepress/components/Layout.vue")))
  },
}

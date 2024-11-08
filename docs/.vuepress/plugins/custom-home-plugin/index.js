// docs/.vuepress/plugins/custom-home-plugin/index.js
import { createPage } from 'vuepress/core'

export default {
    name: 'custom-home-plugin',
    async onInitialized(app) {

        for (const page of app.pages) {
            // 这里可以添加广告
            const cone = page.path === '/' ? page.content : '\n\n<Layout/>' + page.content;
            const index = app.pages.indexOf(page);
            if (index !== -1) {
                let newpath = { ...page }
                const homepage = await createPage(app, {
                    ...newpath,
                    content: cone, // 添加自定义内容
                });
                // 将新的页面添加到 app.pages
                app.pages[index] = homepage;
                // app.pages.push(homepage);
            }
        }
    },
}

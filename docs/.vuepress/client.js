// docs/.vuepress/clientAppSetup.js

import { defineClientConfig } from '@vuepress/client'
import { DatePicker } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

export default defineClientConfig({
    enhance({ app }) {
        // Register DatePicker globally
        app.use(DatePicker)
    }
})
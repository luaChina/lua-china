import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件

// 配置中文
Vue.use(VeeValidate, {
    inject: false // nuxt 与 vee-validate 不兼容，需要手动注入
});
Validator.localize('zh', zh);


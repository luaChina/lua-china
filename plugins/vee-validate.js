import Vue from "vue";
import {
    ValidationProvider,
    localize,
    extend,
    ValidationObserver
} from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN.json";
import {
    required,
    email,
    numeric,
    min,
    confirmed
} from "vee-validate/dist/rules";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
extend("email", email);
extend("required", required);
extend("numeric", numeric);
extend("min", min);
extend("confirmed", confirmed);
localize("zh_CN", zh_CN);

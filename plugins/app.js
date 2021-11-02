import Vue from "vue";
import VueStar from "vue-star";
import notification from "./notification";

Vue.component("VueStar", VueStar);
Vue.use(notification);

window._ = require("lodash");
window.bs = require("bootstrap");
require("bootstrap-icons/font/bootstrap-icons.css");

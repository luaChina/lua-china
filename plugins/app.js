import Vue from "vue";
import VueStar from "vue-star";
import Notifications from "vue-notification";

Vue.component("VueStar", VueStar);
Vue.use(Notifications);

window._ = require("lodash");
require("bootstrap");
require("bootstrap-icons/font/bootstrap-icons.css");

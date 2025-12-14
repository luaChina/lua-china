import Vue from "vue";
import VueStar from "vue-star";
import notification from "./notification";
import MarkdownEditor from "~/components/markdown-editor";

Vue.component("VueStar", VueStar);
Vue.component("markdown-editor", MarkdownEditor);

Vue.use(notification);

window._ = require("lodash");
window.bs = require("bootstrap");
// require("bootstrap-icons/font/bootstrap-icons.css");

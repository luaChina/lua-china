import Vue from 'vue'
import Notifications from 'vue-notification'
import DropZone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

Vue.component('DropZone', DropZone);
Vue.use(Notifications);

window._ = require('lodash');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

// @todo 这里可能有问题，单页应用只刷新时初始化
// init tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
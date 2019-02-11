import Vue from 'vue'
import Notifications from 'vue-notification'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

//fontawesome
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

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
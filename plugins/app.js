import Vue from 'vue'
window._ = require('lodash');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

// init tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

import axios from 'axios'

window.tuiViewer = require('tui-editor/dist/tui-editor-Viewer');
window.tuiEditor = require('tui-editor');

Vue.prototype.$http = axios
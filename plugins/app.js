import Vue from 'vue'
window._ = require('lodash');
window.Popper = require('popper.js').default;

window.$ = window.jQuery = require('jquery');
require('bootstrap');

import axios from 'axios'
import Element from 'element-ui'

Vue.use(Element);

window.tuiViewer = require('tui-editor/dist/tui-editor-Viewer');
window.tuiEditor = require('tui-editor');

Vue.prototype.$http = axios
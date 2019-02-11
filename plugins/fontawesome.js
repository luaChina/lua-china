import Vue from 'vue'
import {library, config} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


config.autoAddCss = false;
library.add(fas, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);
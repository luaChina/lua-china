import Vue from 'vue'
window._ = require('lodash');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

// init tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

// bootstrap4 validate Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(document.getElementsByClassName('needs-validation'), function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

import axios from 'axios'

window.tuiViewer = require('tui-editor/dist/tui-editor-Viewer');
window.tuiEditor = require('tui-editor');

Vue.prototype.$http = axios
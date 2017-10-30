// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/Ueditor/ueditor.config.js'
import '../static/Ueditor/ueditor.all.min.js'
import '../static/Ueditor/lang/zh-cn/zh-cn.js'
import '../static/Ueditor/ueditor.parse.min.js'

Vue.config.productionTip = false


import Vuex from "vuex"

Vue.use(Vuex)

import axios from "axios"
import vueAxios from "vue-axios"

Vue.use(vueAxios, axios)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

router.beforeEach(function(to, from, next) {
    console.log()
    if (to.name == "login") {
        next()
    } else {
        if (sessionStorage.getItem("id")) {
            next()
        } else {
            next(false)
        }
    }

})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
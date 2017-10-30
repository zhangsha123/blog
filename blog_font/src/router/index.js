import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import list from '@/components/list'
import loading from '@/components/loading'
import error from '@/components/error'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
    routes: [{
            path: "/",
            name: "loading",
            component: loading
        },
        {
            path: "/error",
            name: "error",
            component: error
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            children: [{
                path: 'list',
                name: 'list',
                component: list
            }, {
                path: '/index/detail',
                name: 'detail',
                component: detail
            }]
        }
    ]
})
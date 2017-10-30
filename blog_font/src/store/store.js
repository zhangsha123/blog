import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import action_type from "./action_type"

var store = new Vuex.Store({
    state: {
        headData: null,
        articleAll: null,
        articleList: [],
        toplist: [],
        newlist: [],
        breadcast: []
    },
    actions: {

        [action_type.ARTICLEAll.actions]({ commit }, _this) {

            return new Promise(function(resolve, reject) {
                _this.axios.get("http://zsha.net.cn:9999/api/front_article/getArticleAll").then(function(data) {
                    console.log("http://zsha.net.cn:9999")
                    // console.log(data.data)
                    commit(action_type.ARTICLEAll.mutations, data)

                    resolve("ok")
                }, function(err) {
                    reject(err)
                })
            })


        },

        [action_type.HEADDATA.actions]({ dispatch, commit }, _this) {
            // dispatch(action_type.ARTICLEAll.actions).then(function() {
            //     _this.axios.get("/api/front_article/getNav").then(function(data) {

            //         console.log(data.data)
            //         if (data.data.code == "6010") {
            //             commit(action_type.HEADDATA.mutations, data)
            //             _this.$router.push({ path: "/index/list" })
            //         } else {
            //             _this.$router.push({ path: "/error" })
            //         }

            //     })
            // }, function(err) {
            //     _this.$router.push({ path: "/error" })
            // }).catch(function(err) {
            //     console.log(err)

            // })

            return new Promise(function(resolve, reject) {
                _this.axios.get("/api/front_article/getNav").then(function(data) {

                    // console.log(data.data)
                    commit(action_type.HEADDATA.mutations, data)

                    resolve("ok")
                }, function(err) {
                    reject(err)
                })
            })


        },
        [action_type.DEFAULTDATA.actions]({ dispatch, commit }, _this) {
            Promise.all([dispatch(action_type.ARTICLEAll.actions, _this), dispatch(action_type.HEADDATA.actions, _this)]).then(function(data) {
                commit(action_type.RECOMMENDDATA.mutations)
                commit(action_type.TOPDATA.mutations)
                commit(action_type.NEWDATA.mutations)
                commit(action_type.BREADCASTDATA.mutations, "index")
                _this.$router.push({ path: "/index/list" })

            }, function(err) {
                _this.$router.push({ path: "/error" })
            }).catch(function(err) {
                console.log(err)
            })
        },
        //全站搜索
        [action_type.SEARCHDATA.actions]({ dispatch, commit }, name) {
            commit(action_type.SEARCHDATA.mutations, name)
        },
        //文章推荐列表
        [action_type.RECOMMENDDATA.actions]({ dispatch, commit }, data) {
            commit(action_type.RECOMMENDDATA.mutations)
            commit(action_type.BREADCASTDATA.mutations, "index")
        },
        //header点击更变数据
        [action_type.HEADCHANGEDATA.actions]({ dispatch, commit }, type) {
            commit(action_type.HEADCHANGEDATA.mutations, type)
        },
        //breadcast数组更变
        [action_type.BREADCASTDATA.actions]({ dispatch, commit }, data) {
            commit(action_type.BREADCASTDATA.mutations)
        },
        //头部二级分类点击时触发面包屑数组更变
        [action_type.HEADBREADDATA.actions]({ dispatch, commit }, data) {
            // 触发面包屑数组
            commit(action_type.BREADCASTDATA.mutations, data)
        },
        //一级分类点击时触发面包屑数组更变
        [action_type.HEADONECHANGEDATA.actions]({ dispatch, commit }, data) {
            // 触发面包屑数组
            commit(action_type.BREADCASTDATA.mutations, [data])
                // 重新计算当前一级分类文章数
            commit(action_type.HEADONECHANGEDATA.mutations, data.oneId)
        },



    },
    mutations: {
        //头部导航
        [action_type.HEADDATA.mutations](state, data) {
            state.headData = data.data.data
        },
        // 所有文章
        [action_type.ARTICLEAll.mutations](state, data) {
            state.articleAll = data.data.data
        },
        //搜索
        [action_type.SEARCHDATA.mutations](state, name) {
            // console.log(name)
            state.articleList = state.articleAll.filter(function(i) {
                return i.article_name.includes(name)
            })
            console.log(state.articleList)
        },
        // 推荐列表
        [action_type.RECOMMENDDATA.mutations](state, name) {
            // console.log(state.articleAll)
            state.articleList = state.articleAll.filter(function(i) {
                return i.recommend == "1"
            })
            console.log(state.articleList)
        },
        // 首页breadcast数组
        [action_type.BREADCASTDATA.mutations](state, data) {
            // console.log(state.articleAll)
            state.breadcast = [{ cnname: "首页", oneId: null, twoId: null }]
            if (data !== "index") {
                state.breadcast.push(...data)
            }

            console.log(state.breadcast)
        },
        // 点击排行
        [action_type.TOPDATA.mutations](state, name) {
            console.log(state.articleAll)
            state.toplist = state.articleAll.sort(function(a, b) {
                return a.visitors < b.visitors
            })
            state.toplist = state.toplist.slice(0, 5)
            console.log(state.toplist)
        },
        // 最新排行
        [action_type.NEWDATA.mutations](state, name) {
            console.log(state.articleAll)

            state.newlist = state.articleAll.sort(function(a, b) {
                return Date.parse(b.TIME) - Date.parse(a.TIME);
            })
            state.newlist = state.newlist.map(function(i) {
                i.TIME = i.TIME.substr(0, 10)
                return i
            })
            state.newlist = state.newlist.slice(0, 5)
            console.log(state.newlist)
        },
        //header二级分类点击更变文章数据
        [action_type.HEADCHANGEDATA.mutations](state, type) {
            state.articleList = state.articleAll.filter(function(i) {
                return i.twoId == type
            })
            console.log(state.articleList)

        },
        //一级分类点击更变文章数据
        [action_type.HEADONECHANGEDATA.mutations](state, type) {
            state.articleList = state.articleAll.filter(function(i) {
                return i.oneId == type
            })
            console.log(state.articleList)

        }
    },

})

export default store
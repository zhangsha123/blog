import { ADD_INDEX, ADD_TAB } from "./type_mutation"

export default {
    state: {
        num: 1,
        index: null,
        tab: null
    },
    mutations: {
        addfn(state, i) {
            state.num += i
        },
        [ADD_INDEX.mutations_type](state, data) {
            state.index = data
        },
        [ADD_TAB.mutations_type](state, data) {
            state.tab = data
        },
    },
    getters: {
        numgetter(state) {
            return "$" + state.num
        }
    },
    actions: {

        addAction({ dispatch, commit, state, getter }, i) {
            // dispatch("a")
            commit("addfn", i)

        },
        [ADD_INDEX.action_type]({ dispatch, commit, state, getter }, _this) {
            console.log(_this)
            return new Promise(function(resolve) {
                _this.axios.get("/api/index").then(function(data) {
                    commit(ADD_INDEX.mutations_type, data.data)
                    resolve("ok")
                })

            })

        },
        [ADD_TAB.action_type]({ dispatch, commit, state, getter }, _this) {
            dispatch(ADD_INDEX.action_type, _this).then(function(data) {
                _this.axios.get("/api/tab").then(function(datas) {
                    commit(ADD_TAB.mutations_type, datas.data)
                })

            })


        }

    }
}
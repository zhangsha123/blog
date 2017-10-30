<template>
  <el-breadcrumb separator="/" class="breadCrumb">
    <el-breadcrumb-item v-for="(i,index) in datalist" >
        <span @click="clickFn(i,index)"> {{i.cnname}} </span></el-breadcrumb-item>

</el-breadcrumb>
</template>
<script>
    import {
        mapState,
        mapActions
    } from "vuex"
    import action_type from "../store/action_type"
    export default {
        computed: {
            ...mapState({
                datalist: (state) => state.breadcast
            })
        },
        methods: {
            clickFn(i, index) {
                if (i.twoId === null && index != 0) {
                    this.changeFn(i)
                    this.$router.push({
                        path: "/index/list"
                    })
                }
                if (index === 0) {
                    this.indexFn()
                    this.$router.push({
                        path: "/index/list"
                    })
                }
            },
            ...mapActions({
                changeFn: action_type.HEADONECHANGEDATA.actions,
                indexFn: action_type.RECOMMENDDATA.actions
            })
        }
    }
</script>
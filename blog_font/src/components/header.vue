<template>
    <nav>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

       <el-submenu v-for="(i,index) in datalist" :index="i.onedata.id" >
       
        <template slot="title">{{i.onedata.cnname}}</template>
    <el-menu-item v-for="(j,index2) in i.twodata" :index="j.id">{{j.cnname}}</el-menu-item>

</el-submenu>
<!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
</el-menu>
</nav>

</template>

<script>
    import {
        mapState,
        mapActions
    } from "vuex"
    import action_type from "../store/action_type"
    export default {
        name: 'header',
        data() {
            return {
                activeIndex: '1',
            };
        },
        computed: {
            ...mapState({
                datalist: (state) => state.headData
            })
        },
        methods: {
            ...mapActions({
                changeList: action_type.HEADCHANGEDATA.actions,
                // 二级分类点击后改变面包屑数组
                headbreadList: action_type.HEADBREADDATA.actions
            }),
            handleSelect(key, keyPath) {
                console.log(key)
                this.changeList(key)
                this.datalist.forEach(function(i) {
                    i.twodata.forEach(function(j) {
                        if (j.id == key) {
                            console.log(j)
                            var arr = [{
                                cnname: i.onedata.cnname,
                                oneId: i.onedata.id,
                                twoId: null
                            }, {
                                cnname: j.cnname,
                                oneId: j.parent_id,
                                twoId: j.id
                            }]
                            console.log(arr)
                            this.headbreadList(arr)
                        }
                    }.bind(this))
                }, this);

            }
        },
        mounted() {
            console.log(this.datalist)
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-menu{
        padding-left:150px;
    }
    .el-menu--dark{
        background:linear-gradient(#492500,#321b02);
        border-top:1px solid #743b0d;
        border-bottom:1px solid #743b0d;
    }
    .breadCrumb {
        height: 40px;
        line-height: 40px;
        /*background: lightblue;*/
        padding-left: 120px;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    .el-col {
        border-radius: 4px;
    }
    
    .bg-purple-dark {
        background: #99a9bf;
    }
    
    .bg-purple {
        background: #d3dce6;
    }
    
    .bg-purple-light {
        background: #e5e9f2;
    }
    
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
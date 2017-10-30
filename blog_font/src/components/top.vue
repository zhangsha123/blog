<template>
   <el-row class="rowall">
  <el-col :span="24" style="border-radius: 4px;">
    
    <el-row class="classrowone">
 点击排行
</el-row>
<el-row v-for="(i,index) in datalist" class="classrow" :span="24">
    <el-col :span="2" class="classrow1">{{index+1}}</el-col>
  <el-col :span="14" class="classrow2">{{i.article_name}}</el-col>
  
  <el-col :span="6" class="classrow3">
      <i class="el-icon-star-on"></i>
      <span>{{i.visitors}}</span>
      
</el-col>
</el-row>
  </el-col>
</el-row>
 
</template>


<script>
    import {
        mapActions,
        mapState
    } from "vuex"
    import actions_type from "../store/action_type"

    export default {
        data() {
            return {
                // datalist: [{
                //     name: "haha",
                //     class: "技术",
                //     editor: "zhangsan",
                //     star: "1",
                // }, {
                //     name: "haha",
                //     class: "技术",
                //     editor: "zhangsan",
                //     star: "3",
                // }, {
                //     name: "haha",
                //     class: "技术",
                //     editor: "zhangsan",
                //     star: "100",
                // }]
            }
        },
        computed: {
            ...mapState({
                datalist: (state) => state.toplist
            })
        },
        methods: {
            // ...mapActions({
            //     topAction: actions_type.TOPDATA.actions
            // })
        },
        created() {
            // this.topAction()
        }
    }
</script>
<style scoped>
    .rowall {
        background: url("../../static/img/a (5).jpg");
        padding: 5px;
        border-radius: 5px;
        color: #dbc1a7;
        margin-right:20px;
    }
    
    .classrowone {
        border-radius: 5px;
        margin-bottom: 10px;
        color: #dbc1a7;
        padding: 5px;
    }
    
    .classrow {
        margin: 5px 0;
    }
    
    .classrow1 {
        border-radius: 5px;
        width: 26px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background: red;
        margin-right: 10px;
        font-size: 12px;
    }
    
    .classrow2 {
        /*background: lightblue;*/
        margin-right: 10px
    }
    
    .classrow3 {
        /*background: lightgreen;*/
        font-size: 14px;
    }
    
    .classrow3 span {
        display: inline-block;
        width: 50px;
        text-align: center
    }
</style>
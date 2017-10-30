<template>
   <el-row class="rowall">
  <el-col :span="24" style="border-radius: 4px;">
    
    <el-row class="classrowone">
 最新文章
</el-row>
<el-row v-for="(i,index) in datalist" class="classrow" :span="24">
    <el-col :span="2" class="classrow1">{{index+1}}</el-col>
  <el-col :span="14" class="classrow2">{{i.article_name}}</el-col>
  
  <el-col :span="6" class="classrow3">{{i.TIME}}</div></el-col>
</el-row>
  </el-col>
</el-row>
 
</template>


<script>
    import {
        mapActions,
        mapState
    } from "vuex"
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapState({
                datalist: (state) => state.newlist
            })
        }
    }
</script>
<style scoped>
    .rowall {
        background: url("../../static/img/a (5).jpg");
        padding: 5px;
        border-radius: 5px;
        color:#dbc1a7;
        margin-right:20px;
    }
    
    .classrowone {
        border-radius: 5px;
        margin-bottom: 10px;
        color: #dbc1a7;
        padding: 5px;
        font-weight: bold;
    }
    
    .classrow {
        margin: 5px 0;
        border-bottom: 1px dashed #743b0d;
    }
    
    .classrow1 {
        border-radius: 50%;
        width: 20px;
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
</style>
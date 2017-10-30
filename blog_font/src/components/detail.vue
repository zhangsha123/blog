<template>
  <main>
      <div v-html="data.content">
        
      </div>
  </main>
 
</template>


<script>
    import {
        mapState,
        mapActions
    } from "vuex"
    import action_type from "../store/action_type"
    export default {
        data() {
            return {
                data: {
                    content: null
                }
            }
        },
        created() {
            this.axios.get(`/api/front_article/getArticle?id=${this.$route.params.id}`).then(function(data) {
                console.log(data)
                this.data = data.data.data
                var arr = [this.$route.params.onedata, this.$route.params.twodata]
                this.headbreadList(arr)
            }.bind(this))
        },
        methods: {
            ...mapActions({

                // 二级分类点击后改变面包屑数组
                headbreadList: action_type.HEADBREADDATA.actions
            }),
        }

    }
</script>
<style>
    main {
        padding: 20px;
        background:url("../../static/img/a (4).gif") center top repeat;
        color: #000;
    }
</style>
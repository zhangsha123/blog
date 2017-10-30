<template>
  <div>数据请求失败</div>
 
</template>
<script>
    import {
        HEADDATA
    } from '../store/action_type'

    import {
        mapActions
    } from "vuex";



    export default {
        name: 'index',
        data() {
            return {}
        },

        computed: {

        },

        created() {
            this.headdataFn(this)
            console.log(HEADDATA)
        },
        methods: {
            ...mapActions({
                headdataFn: HEADDATA.actions
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .topPadding {}
    
    ul {
        font-size: 0.4rem
    }
    
    .mint-loadmore {
        font-size: 0.48rem
    }
</style>
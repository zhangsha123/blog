<template>
  <div>加载中</div>
 
</template>
<script>
    import {

        DEFAULTDATA
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

        mounted() {



            this.headdataFn(this)

        },
        methods: {
            ...mapActions({
                headdataFn: DEFAULTDATA.actions
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
<template>
  <div id="app">
   
    <router-view class="mainContent"></router-view>
    <!--<footers></footers>-->
  </div>
</template>

<script>
    import footers from "./components/footer"
    export default {
        name: 'app',
        components: {
            footers: footers
        }
    }
</script>

<style>
    #app {
        min-height: 100%;
        position: relative
    }
    
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    a {
        color: black;
        text-decoration: none
    }
    
    .mainContent {
        min-height: 100%;
        /*position: relative;*/
    }
</style>
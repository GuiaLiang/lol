<template>
  <div id="app">
    <router-view></router-view>
    <loading></loading>
  </div>
</template>

<script>
import 'normalize.css'
import Loading from '@/components/Loading'
export default {
    name: 'app',
    components: {
        Loading
    },
    beforeCreate() {
        document.body.style.height = window.innerHeight + 'px';
    }
}
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    #app {
        width: 100%;
        height: 100%;
    }
</style>

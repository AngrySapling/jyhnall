<template>
  <div id="app">
     <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
}
a{
  display:inherit;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #d8d8d8;
}
 
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius:10px;
}
 
::-webkit-scrollbar-thumb {
  background-color: #bfc1c4;
}
</style>

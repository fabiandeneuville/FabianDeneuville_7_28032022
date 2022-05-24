<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import '../public/style/main.scss'

import Landing from './views/Landing'

export default {
  name: 'App',
  components: {
      'landing': Landing
  }
}
</script>

<style>

*, ::before, ::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  height:100vh;
  background: rgb(255, 213, 215);
}
</style>

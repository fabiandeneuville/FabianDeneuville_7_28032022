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


</style>

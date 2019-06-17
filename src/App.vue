<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <transbox location="HomePage"/>
    <HelloWorld msg="Welcome to KumoTrans Demo"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import transbox from './components/transbox.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    transbox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

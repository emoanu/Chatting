<template>
  <div id="app">
    <router-view></router-view>
    <!-- router-view use for displaying our reouter intead of redirecting to another page -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
$fa-font-path: "~font-awesome/fonts";
$zmdi-font-path: "~material-design-iconic-font/dist/fonts";
@import "@/assets/styles/style";
@import "~font-awesome/scss/font-awesome.scss";
@import "~material-icons/iconfont/material-icons.css";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "../node_modules/material-design-iconic-font/scss/material-design-iconic-font.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

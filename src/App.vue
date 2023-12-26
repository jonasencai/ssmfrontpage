<template>
  <p id="app" >
    <router-view></router-view>
  </p>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style>
  #app {
    background-image: url(./static/image/ccc.png);
    height: 900px;
    background-size: cover;
  }
</style>
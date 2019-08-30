<template>
  <div class="index">
    <headerTop/>
    <router-view/>
  </div>
</template>

<script>
  import headerTop from '../components/headerTop'
  export default {
    name: "index",
    components : {
      headerTop
    }
  }
</script>

<style scoped>
  .index{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>

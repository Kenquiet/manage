<template>
  <div class="index">
    <headerTop/>
    <leftMenu/>
    <div class="rightContainer">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import headerTop from '../components/headerTop'
  import leftMenu from '../components/leftMenu'
  export default {
    name: "index",
    components : {
      headerTop,
      leftMenu
    }
  }
</script>

<style scoped>
  .index{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .rightContainer{
    padding-left: 180px;
    width: 100%;
    height: 100%;
  }
</style>

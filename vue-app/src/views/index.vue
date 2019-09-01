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
    position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
  }
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode';
  export default {
    name: "App",
    mounted () {
      if (localStorage.eleToken) {
        //解析token
        const decoded = jwtDecode(localStorage.eleToken);
        this.$store.dispatch('setAuthorizated', !this.isEmpty(decoded));
        this.$store.dispatch('setUser',decoded);
      }
    },
    methods: {
      // 封装判断解析到的token 是否存在，返回值是 true 或者 false
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === 'object' && Object.keys(value).length=== 0) ||
          (typeof value === 'string' && value.trim().length === 0)
        )
      }
    }
  }
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
          default-active="2"
          class="el-menu-vertical"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b">
        <router-link to="/home">
          <el-menu-item>
            <i class="fa fa-margin fa-server"></i>
            <span>主页</span>
          </el-menu-item>
        </router-link>

        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin ' +item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>

      </el-menu>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    name: "leftMenu",
    data() {
      return {
        items: [
          {
            icon: "fa-money",
            name: "资金管理",
            path: "fund",
            children: [
              { path: "foundlist", name: "资金流水" }
              ]
          },
          {
            icon: "fa-asterisk",
            name: "信息管理",
            path: "info",
            children: [
              { path: "infoshow", name: "个人信息" }
              ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .menu_page{
    position: fixed;
    top: 71px;
    left: 0;
    min-height: 100%;
    background-color: #324057;
    z-index: 99;
  }
  .fa-margin {
    margin-right: 5px;
  }
  .el-menu{
    border-right: none;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
  .el-menu-vertical {
    width: 35px;
  }
  .el-submenu .el-menu-item {
    min-width: 180px;
  }

  .hiddenDropdown,
  .hiddenDropname {
    display: none;
  }
  a {
    text-decoration: none;
  }

</style>

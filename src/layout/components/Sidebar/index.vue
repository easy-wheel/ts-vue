<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import SidebarItem from "./SidebarItem.vue";
import { PermissionModule } from "@/store/modules/permission";

import variables from "@/styles/_variables.scss";
@Component({
  name: "SideBar",
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }
  // vue-router addRouter后$router.options.routes不会动态更新问题  https://github.com/vuejs/vue-router/issues/2280
  // 前端在vuex维护一份addRouter后的完整路由信息，用于菜单渲染
  get routes() {
    return PermissionModule.routes;
  }
  get variables() {
    return variables;
  }
  get isCollapse() {
    return !this.sidebar.opened;
  }

  private created(): void {
    console.log("路由$route", this.$router);
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }
    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
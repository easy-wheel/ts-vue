<template>
  <div>
    <el-menu
      :router="true"
      :default-active="activeIndex"
      active-text-color="#409eff"
      class="el-menu-demo"
      @select="handleSelect"
    >
      <el-menuItem :route="l.path" :index="l.index" v-for="l in menuList" :key="l.index">{{l.name}}</el-menuItem>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Nav extends Vue {
  menuList: Array<object> = [
    {
      index: "1",
      path: "/",
      name: "首页"
    },
    {
      index: "2",
      path: "/articles",
      name: "文章列表"
    }
  ];
  activeIndex: string = "1";

  handleSelect(val: string, oldVal: string) {
    this.activeIndex = val;
  }
}
</script>

<style lang="less" scoped>
</style>
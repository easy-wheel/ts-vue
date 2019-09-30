<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import AdminDashboard from "./admin/index.vue";
import EditorDashboard from "./editor/index.vue";
// vue-property-decorator
// vue: 实际上就是 Vue 本身,继承vue相关属性和函数

// @Component 声明成一个vue的组件实例，如果不使用，则不能得到一个vue组件
// @Component 装饰器可以接收一个对象作为参数，可以在对象中声明 components ，filters，directives等未提供装饰器的选项
@Component({
  name: "Dashboard",
  components: {
    AdminDashboard,
    EditorDashboard
  }
})
export default class extends Vue {
  private currentRole = "admin-dashboard";

  get roles() {
    return UserModule.roles;
  }

  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editor-dashboard";
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
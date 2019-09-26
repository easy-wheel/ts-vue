<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">
      roles:
      <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";

// vue-property-decorator
// vue: 实际上就是 Vue 本身,继承vue相关属性和函数

// @Component 声明成一个vue的组件实例，如果不使用，则不能得到一个vue组件
// @Component 装饰器可以接收一个对象作为参数，可以在对象中声明 components ，filters，directives等未提供装饰器的选项
@Component({
  name: "Dashboard"
})
export default class extends Vue {
  get name() {
    return UserModule.name;
  }
  get roles() {
    return UserModule.roles;
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
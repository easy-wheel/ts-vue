<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="['menu-wrapper', isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <svg-icon v-if="theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon" />
          <span v-if="theOnlyOneChild.meta.title" slot="title">{{ theOnlyOneChild.meta.title }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from "path";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Route, RouteConfig } from "vue-router";
import { isExternal } from "@/utils/validate";
import SidebarItemLink from "./SidebarItemLink.vue";

@Component({
  name: "SidebarItem",
  components: {
    SidebarItemLink
  }
})
export default class extends Vue {
  // !: 表示一定存在，?: 表示可能不存在。这两种在语法上叫赋值断言

  // @Prop(options: (PropOptions | Constructor[] | Constructor) = {})
  // PropOptions，可以使用以下选项：type，default，required，validator
  // Constructor[]，指定 prop 的可选类型
  // Constructor，例如String，Number，Boolean等，指定 prop 的类型
  @Prop({ required: true }) private item!: RouteConfig;
  @Prop({ default: false }) private isCollapse!: boolean;
  @Prop({ default: true }) private isFirstLevel!: boolean;
  @Prop({ default: "" }) private basePath!: string;

  // @Watch(path: string, options: WatchOptions = {})
  // options包含两个属性 immediate?:boolean  侦听开始之后是否立即调用该回调函数 / deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数
  // @Watch('arr', { immediate: true, deep: true })
  // onArrChanged(newValue: number[], oldValue: number[]) {}

  // @Emit(event?: string)
  // @Emit 装饰器接收一个可选参数，该参数是$Emit的第一个参数，充当事件名。如果没有提供这个参数，$Emit会将回调函数名的camelCase转为kebab-case，并将其作为事件名
  // @Emit会将回调函数的返回值作为第二个参数，如果返回值是一个Promise对象，$emit会在Promise对象被标记为resolved之后触发
  // @Emit的回调函数的参数，会放在其返回值之后，一起被$emit当做参数使用

  // @Ref(refKey?: string)
  // @Ref 装饰器接收一个可选参数，用来指向元素或子组件的引用信息。如果没有提供这个参数，会使用装饰器后面的属性名充当参数

  get alwaysShowRootMenu() {
    if (this.item.meta && this.item.meta.alwaysShow) {
      return true;
    }
    return false;
  }

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter(item => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          return true;
        }
      });
      return showingChildren.length;
    }
    return 0;
  }

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null;
    }
    if (this.item.children) {
      for (let child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }

    return { ...this.item, path: "" };
  }

  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    return path.resolve(this.basePath, routePath);
  }
}
</script>
<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>    

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>



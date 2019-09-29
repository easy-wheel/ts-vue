<template>
  <div class="app-container">表格</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getArticles } from "@/api/articles";
import { IArticleData } from "@/api/types";
@Component({
  name: "Table",
  components: {}
})
export default class extends Vue {
  private total = 0;
  private list: IArticleData[] = [];
  private listLoading = true;
  private listParams = {
    page: 1,
    limit: 20
  };

  created() {
    this.getList();
  }

  private async getList() {
    this.listLoading = true;
    const res = await getArticles(this.listParams);
    console.log("列表数据", res);
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

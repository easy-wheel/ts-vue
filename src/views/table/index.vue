<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" highlight-current-row>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status">
        <template slot-scope="{row}">
          <el-tag :type="row.status | articleStatusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions">
        <template slot-scope="scope">
          <router-link :to="'/table/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listParams.page"
      :limit.sync="listParams.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getArticles } from "@/api/articles";
import { IArticleData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";

@Component({
  name: "Table",
  components: {
    Pagination
  }
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
    const { data } = await getArticles(this.listParams);
    console.log("列表", data);
    this.list = data.items;
    this.total = data.total;
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false;
    }, 0.5 * 1000);
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

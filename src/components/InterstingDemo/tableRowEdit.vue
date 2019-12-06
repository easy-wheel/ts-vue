<template>
  <el-table :data="tableData" style="width: 100%" border highlight-current-row>
    <el-table-column prop="name" label="商品名称" width="280">
      <template scope="scope">
        <el-input
          v-model="scope.row.name"
          placeholder="请输入内容"
          v-show="scope.row.showEdit"
        ></el-input>
        <!--通过v-show和对行数据中的编辑状态变量取反来动态切换编辑状态-->
        <!--v-show相比v-if有更高的初始渲染消耗，适合频繁切换的场合-->
        <span v-show="!scope.row.showEdit">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="date" label="创建时间" width="280">
      <template scope="scope">
        <el-input
          v-model="scope.row.date"
          placeholder="请输入内容"
          v-show="scope.row.showEdit"
        ></el-input>
        <span v-show="!scope.row.showEdit">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="status" label="状态" width="120">
      <template slot-scope="scope">
        <!-- 三目选择，根据数据动态修改数据样式 -->
        <!--要是觉得element的标签不好，想自己设计样式也可以结合三目表达式动态绑定自己设计的class或者style-->
        <el-tag :type="scope.row.tag === '已付款' ? 'success' : 'danger'">
          {{ scope.row.tag }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="money" label="实收(元)" width="120">
      <template scope="scope">
        <el-input
          v-show="scope.row.showEdit"
          v-model="scope.row.money"
          placeholder="请输入内容"
        ></el-input>
        <span v-show="!scope.row.showEdit">{{ scope.row.money }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="purchaser" label="购买者" width="200">
      <template scope="scope">
        <el-input
          v-show="scope.row.showEdit"
          v-model="scope.row.purchaser"
          placeholder="请输入内容"
        ></el-input>
        <span v-show="!scope.row.showEdit">{{ scope.row.purchaser }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template scope="scope">
        <!--scope可以取到行索引(scope.$index)和行数据(scope.row)-->
        <div v-if="scope.row.showEdit">
          <el-button type="primary" @click="save(scope.row)">保存</el-button>
          <el-button type="primary" @click="cancel(scope.row)">取消</el-button>
        </div>

        <!--这里用到v-if，主要是跟后边的v-else配合使用，也可以用v-show，不过实现方式不一样哦，具体自己再去摸索吧-->
        <div v-else>
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
let tableData = [
  {
    key: 1,
    name: "mac口红",
    date: "2016-05-03",
    tag: "已付款",
    money: "150",
    purchaser: "青溪"
  },
  {
    key: 2,
    name: "mac口红",
    date: "2016-05-03",
    tag: "已付款",
    money: "150",
    purchaser: "青溪"
  },
  {
    key: 3,
    name: "mac口红",
    date: "2016-05-03",
    tag: "未付款",
    money: "150",
    purchaser: "青溪"
  }
];
export default {
  data() {
    this.cacheData = tableData.map(item => ({ ...item }));
    return {
      tableData
    };
  },
  methods: {
    handleEdit(index, row) {
      row.showEdit = !row.showEdit;
    },
    edit(row) {
      const newData = [...this.tableData];
      if (row) {
        row.showEdit = true;
        this.tableData = newData;
      }
    },
    save(row) {
      const newData = [...this.tableData];
      if (row) {
        delete row.showEdit;
        this.tableData = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(row) {
      const newData = [...this.tableData];
      if (row) {
        console.log("row", row);
        console.log("cache", this.cacheData);
        Object.assign(
          row,
          this.cacheData.filter(item => row.key === item.key)[0]
        );
        delete row.showEdit;
        console.log("row更改", row);
        this.tableData = newData;
      }
    }
  }
};
</script>

<style>
.b1 {
  border: 1px dashed red;
}
</style>

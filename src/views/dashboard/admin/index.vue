<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <!-- <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <radar-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import "echarts/theme/macarons.js"; // Theme used in BarChart, LineChart, PieChart and RadarChart
import { Component, Vue } from "vue-property-decorator";
import LineChart, { ILineChartData } from "./components/LineChart.vue";
import BarChart from "./components/BarChart.vue";

// just for mock, should get from server
const lineChartData: { [type: string]: ILineChartData } = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

@Component({
  name: "DashboardAdmin",
  components: {
    LineChart,
    BarChart
  }
})
export default class extends Vue {
  private lineChartData = lineChartData.newVisitis;
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
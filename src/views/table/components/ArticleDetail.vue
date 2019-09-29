<template>
  <div class="container">
    <el-form ref="articleForm" :model="articleForm" label-width="120px" :rules="rules">
      <el-form-item label="Author:" class="postInfo-container-item" prop="author">
        <el-select
          v-model="articleForm.author"
          :remote-method="getRemoteUserList"
          filterable
          default-first-option
          remote
          placeholder="Search user"
        >
          <el-option
            v-for="(item, index) in userListOptions"
            :key="item+index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Publish Time:">
        <el-date-picker
          v-model="timestamp"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="title：" prop="title" width="200">
        <el-input v-model="articleForm.title" placeholder="Please input title"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
      <!-- <el-button size="small" @click="routerBack(-1)">取 消</el-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getUsers } from "@/api/users";
import { getArticle, defaultArticleData } from "@/api/articles";
import { Form } from "element-ui";

@Component({
  name: "ArticleDetail"
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;

  private validateRequire = (rule: any, value: string, callback: Function) => {
    console.log("value", value);
    console.log("rule", rule);
    if (value === "") {
      this.$message({
        message: rule.field + " is required",
        type: "error"
      });
      callback(new Error(rule.field + " is required"));
    } else {
      callback();
    }
  };

  private articleForm = Object.assign({}, defaultArticleData);
  private loading = false;
  private userListOptions = [];
  private rules = {
    author: [{ validator: this.validateRequire, trigger: "change" }]
  };

  get timestamp() {
    return +new Date(this.articleForm.timestamp);
  }

  set timestamp(value) {
    this.articleForm.timestamp = +new Date(value);
  }

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchDetail(parseInt(id));
    } else {
      this.articleForm = Object.assign({}, defaultArticleData);
    }
  }

  private async fetchDetail(id: number) {
    try {
      const { data } = await getArticle(id, {});
      this.articleForm = data.article;
    } catch (error) {
      console.log(error);
    }
  }

  private async getRemoteUserList(name: string) {
    const { data } = await getUsers({ name });
    if (!data.items) return;
    this.userListOptions = data.items.map((v: any) => v.name);
  }

  private submitForm() {
    (this.$refs.articleForm as Form).validate(valid => {
      console.log("articleForm", this.articleForm);
      if (valid) {
        this.loading = true;
        this.$notify({
          title: "Success",
          message: "The post published successfully",
          type: "success",
          duration: 2000
        });
        // this.articleForm.status = 'published'
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ path: "/table/list" });
        }, 0.5 * 1000);
      } else {
        console.error("Submit Error!");
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" class="content">
        <VueEditor v-model="form.content" :editorToolbar="customToolbar" />
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            :label="item.id"
            v-for="item in categoryList"
            :key="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :file-list="form.cover"
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{ Authorization: token }"
          list-type="picture-card"
          :on-success="coverSuccse"
          :on-remove="coverRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="subMit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      checkList: [],
      categoryList: [],
      token: localStorage.getItem("token"),
      type: 1,
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
    };
  },
  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      console.log(res);
      res.data.data.splice(0, 2);
      this.categoryList = res.data.data;
    });
    // 获取编辑文章信息
    if (this.$route.query.id) {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.checkList = res.data.data.categories.map((item) => {
          return item.id;
        });
        res.data.data.cover.map((img) => {
          if (img.url.indexOf("http") == -1) {
            img.url = this.$axios.defaults.baseURL + img.url;
          }
          img.uid = img.id;
          return img;
        });
        this.form = res.data.data;
      });
    }
  },
  watch: {
    checkList() {
      this.form.categories = this.checkList.map((num) => {
        return {
          id: num,
        };
      });
    },
  },
  methods: {
    coverSuccse(res, file, fileList) {
      console.log(file);
      file.id = res.data.id;
      this.form.cover.push(file);
      this.$message("添加成功");
    },
    coverRemove(file, fileList) {
      // console.log(fileList);
      // 删除封面，点击删除之后重新获取fileList列表中的数据返回给this.form.cover
      this.form.cover = fileList;
      this.$message("删除成功");
    },
    subMit() {
      // console.log(this.form);
      this.$axios({
        url: "/post",
        method: "post",
        data: this.form,
      }).then((res) => {
        // console.log(res);
        this.$router.push("/postlist");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  /deep/ .el-form-item__content {
    line-height: 1;
  }
}
</style>
<template>
  <el-table :data="postList" style="width: 100%">
    <el-table-column label="日期" width="180">
      <template>
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">2020-12-03</span>
      </template>
    </el-table-column>
    <el-table-column label="缩略图" width="200">
      <template slot-scope="scope">
        <img
          v-if="scope.row.cover.length > 0"
          :src="scope.row.cover[0].url | fixImgUrl"
          class="thumbnail"
        />
        <img v-else src="@/assets/logo.png" class="thumbnail" />
      </template>
    </el-table-column>
    <el-table-column label="标题" prop="title"> </el-table-column>
    <el-table-column
      label="作者"
      width="140"
      prop="user.nickname"
    ></el-table-column>
    <el-table-column label="操作">
      <template>
        <el-button size="mini">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
export default {
  data() {
    return {
      postList: [],
    };
  },
  methods: {},
  created() {
    this.$axios({
      url: "/post",
    }).then((res) => {
      console.log(res.data.data);
      this.postList = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
</style>
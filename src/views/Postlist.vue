<template>
  <el-table :data="postList" style="width: 100%">
    <el-table-column label="日期" width="180">
      <template>
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">2020-12-03</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>文章: {{ scope.row.title }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.user.username }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
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
</style>
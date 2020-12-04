<template>
  <div>
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
          <el-button type="warning" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="prev,pager,next,sizes, jumper"
      :total="total"
      :page-size="pageSize"
      :page-sizes="[2, 5, 10]"
    >
    </el-pagination>
  </div>
</template>


<script>
export default {
  data() {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0,
    };
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/post",
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        },
      }).then((res) => {
        console.log(res.data);
        this.postList = res.data.data;
        this.total = res.data.total;
      });
    },
    currentChange(newValue) {
      // console.log(newValue);
      this.pageIndex = newValue;
      this.loadPage();
    },
    sizeChange(newValue) {
      this.pageSize = newValue;
      this.loadPage();
    },
  },
  created() {
    this.loadPage();
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
<template>
  <div class="container">
    <div class="login">登录</div>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="用户名/账号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即登录</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        method: "post",
        url: "/login",
        data: {
          username: this.form.name,
          password: this.form.pwd,
        },
      }).then((res) => {
        // console.log(res.data);
        const { message, data } = res.data;
        if (message == "登录成功") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          this.$router.push("/");
        }
      });
    },
    reset() {
      (this.form.name = ""), (this.form.pwd = "");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .login {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
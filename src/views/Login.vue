<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <transition name="slide-fade" mode="out-in" appear>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-3 login-box">
            <h2>Login</h2>
            <form @submit.prevent="handlLogin">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div class="btn-login">
                <button type="submit" class="btn btn-dark">Login</button>
              </div>
            </form>
            <div class="error-list">
              <div
                class="alert alert-danger fade show"
                role="alert"
                v-if="error"
              >
                {{ error }}
              </div>
            </div>
            <div class="col-md-4"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handlLogin() {
      try {
        const response = await axios.post("http://127.0.0.1:3000/login", {
          email: this.email,
          password: this.password,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          // To Go router home & Reload
          this.$router.push("/", () => this.$router.go(0));
        }
        this.error = "";
      } catch (error) {
        this.error = error.response.data;
        console.log(error.response.data);
      }
    },
  },
  name: "Login",
};
</script>

<style lang="scss">
.login {
  .login-box {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px #3f3c3c85;
    position: relative;
    text-align: left;
    margin-top: 12rem;
    border-radius: 1rem;
    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .btn-login {
      text-align: center;
    }
    .btn {
      border-radius: 2rem;
      width: 40%;
      border: none;
      margin-bottom: 1.5rem;
      padding: 0.7rem;
      font-weight: bolder;
      display: inline-block;
      color: #fff;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
      z-index: 1;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #343a40;
        z-index: -2;
      }
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: darken(#343a40, 15%);
        transition: all 0.3s;
        z-index: -1;
      }
      &:hover {
        color: #fff;
        &:before {
          width: 100%;
        }
      }
    }
  }
  .alert {
    text-align: center;
  }
}
</style>

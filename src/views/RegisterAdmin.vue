<template>
  <div class="register-admin">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <transition name="slide-fade" mode="out-in" appear>
        <div class="col-md-4 register-box">
          <h2>Register</h2>
          <form @submit.prevent="handlRegisterAdmin">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Username</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="Enter Your Username"
                v-model="name"
              />
            </div>
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
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Re-enter Password</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Re-Password"
                v-model="Repassword"
              />
            </div>
            <button type="submit" class="btn btn-dark">Register</button>
          </form>
          <div class="error-list">
            <transition name="slide-fade" mode="out-in" appear>
                <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert" v-if="error">{{ error }}</div>
            </transition>
        </div>
        <div class="created">
          <transition name="slide-fade" mode="out-in" appear>
                <div class="alert alert-success alert-dismissible fade show mt-3" role="alert" v-if="message">{{ message }}</div>
          </transition>
        </div>
        </div>
        </transition>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "RegisterAdmin",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      Repassword: "",
      error: "",
      message: ""
    }
  },
  methods: {
    async handlRegisterAdmin() {
      try {
        const token = await localStorage.getItem("token");
        const newAdmin = {
          name: this.name,
          email: this.email,
          password: this.password,
          repeat_password: this.Repassword
        };
        const response = await axios.post('http://127.0.0.1:3000/admin/register-admin', newAdmin, {
          headers: {
            token: token
          }
        });
        this.message = response.data.message
        
      } catch (error) {
        this.error = error.response.data;
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
.register-admin {
  .register-box {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px #3f3c3c85;
    position: relative;
    text-align: left;
    margin-top: 5rem;
    border-radius: 1rem;
    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .btn {
      border-radius: 2rem;
      width: 40%;
      border: none;
      margin-bottom: 0.2rem;
      padding: 0.7rem;
      font-weight: bolder;
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
}
</style>

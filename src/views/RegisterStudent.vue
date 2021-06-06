<template>
  <div class="register-admin">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <transition name="slide-fade" mode="out-in" appear>
        <div class="col-md-4 register-box">
          <h2>Register</h2>
          <form @submit.prevent="handlRegisterStudent">
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
  name: "RegisterStudent",
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
    async handlRegisterStudent() {
      try {
        const token = await localStorage.getItem("token");
        const newStudent = {
          name: this.name,
          email: this.email,
          password: this.password,
          repeat_password: this.Repassword
        };
        const response = await axios.post('http://127.0.0.1:3000/admin/register-student', newStudent, {
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
</style>

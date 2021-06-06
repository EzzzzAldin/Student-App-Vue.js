<template>
  <div class="student-data">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <transition name="slide-fade" mode="out-in" appear>
          <div class="enter-data">
            <h3>Show Data To Student</h3>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Email</span>
              <input
                type="email"
                class="form-control"
                placeholder="Enter Email Of Student"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                v-model="email"
              />
            </div>
            <button
              type="submit"
              class="btn btn-dark"
              @click="handlGetAllData"
            >
              Show
            </button>
          </div>
          </transition>
          <transition name="slide-fade" mode="out-in" appear>
          <div class="error-list">
            <div
              class="alert alert-danger alert-dismissible fade show mt-1"
              role="alert"
              v-if="error"
            >
              {{ error }}
            </div>
          </div>
          </transition>
          <transition name="my-tran" mode="in-out">
          <div class="show-data" v-if="name">
            <h5>
              Username: <small>{{ name }}</small>
            </h5>
            <hr>
            <h5>
              Level: <small>{{ level }}</small>
            </h5>
            <hr>
            <div :key="subject" v-for="subject in subjects">
              <h5>
                Subject: <small>{{ subject.subject }}</small>
              </h5>
              <h5>
                Grade: <small>{{ subject.degree }}</small>
              </h5>
              <hr>
            </div>
          </div>
          </transition>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DataStudent",
  data: function() {
    return {
      name: "",
      email: "",
      level: "",
      subjects: "",
      degrees: "",
    };
  },
  methods: {
    async handlGetAllData() {
      try {
        const token = await localStorage.getItem("token");
        const getStudent = {
          email: this.email,
        };
        const response = await axios.post(
          "http://127.0.0.1:3000/admin/student-data",
          getStudent,
          {
            headers: {
              token: token,
            },
          }
        );
        this.email = response.data.email;
        this.name = response.data.name;
        this.level = response.data.Level;
        this.subjects = response.data.subjects;
        this.degrees = response.data.totelDegrees;
        this.error = "";
      } catch (error) {
        this.error = error.response.data;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.data-student {
  height: 100%;
  overflow: scroll;
}
.enter-data {
  margin-top: 0.5rem;
  text-align: center;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px #3f3c3c85;
  position: relative;
  text-align: center;
  border-radius: 1rem;
  h3 {
    margin-bottom: 1rem;
  }
  .btn {
    margin-top: 1rem;
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
.my-tran-enter-active {
  animation: custom-enter 1s;
  animation-delay: .1s;
  opacity: 0;
}
.mt-tran-leave-active {
  animation: custom-leave 1s;
}
@keyframes custom-enter {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes custom-leave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}
.show-data {
  margin-top: 1rem;
  text-align: center;
  background-color: #fff;
  padding: 20px;
  position: relative;
  text-align: center;
  border-radius: 1rem;
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
  }
}
</style>

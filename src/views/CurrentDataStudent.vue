<template>
  <div class="student-data">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <transition name="slide-fade" mode="out-in" appear>
            <div class="show-data" v-if="subjects">
              <h5>
                {{ name }}
              </h5>
              <hr />
              <h5>
                {{ email }}
              </h5>
              <hr />
              <h5>
                Level: <small>{{ level }}</small>
              </h5>
              <hr />
              <div :key="subject" v-for="subject in subjects">
                <h5>
                  Subject: <small>{{ subject.subject }}</small>
                </h5>
                <h5>
                  Grade: <small>{{ subject.degree }}</small>
                </h5>
                <hr />
              </div>
            </div>
          </transition>
          <transition name="slide-fade" mode="out-in" appear>
            <div v-if="!subjects">
              <div class="alert alert-danger  fade show mt-3" role="alert">
                Your Data unavailable
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
  name: "CurrentDataStudent",
  data: function() {
    return {
      name: "",
      email: "",
      level: "",
      subjects: "",
      degrees: "",
    };
  },
  async created() {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:3000/student/data", {
        headers: {
          token: token,
        },
      });
      this.email = response.data.email;
      this.name = response.data.name;
      this.level = response.data.Level;
      this.subjects = response.data.subjects;
      this.degrees = response.data.totelDegrees;
    } catch (error) {
      console.log(error.response);
    }
  },
};
</script>

<style lang="scss" scoped>
.student-data {
  margin-top: 6rem;
  .card-body {
    background-color: #fff;
    border-radius: 2rem;
    box-shadow: 0 0 5px #3f3c3c85;
  }
}
</style>

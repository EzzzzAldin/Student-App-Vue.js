<template>
  <div class="student-data">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <transition name="slide-fade" mode="out-in" appear>
          <div class="add-subject enter-data">
            <h3>Add subject To Student</h3>
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
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Level</span>
              <input
                type="number"
                min="1"
                max="5"
                class="form-control"
                placeholder="Choose Number Of level"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                v-model="level"
              />
            </div>
            <div class="input-group mb-3" :key="subject" v-for="subject in subjects">
              <span class="input-group-text" id="basic-addon1">Subject</span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Subject"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                v-model="subject.subject"
              />
            </div>
            <button type="submit" class="btn btn-dark" @click="addNewSubjectForm">Add Subject</button>
            <div>
              <button type="submit" class="btn btn-dark" @click="handlPostSubjects">Done</button>
            </div>
            <transition name="slide-fade" mode="out-in" appear>
            <div
                class="alert alert-success fade show mt-3"
                role="alert"
                v-if="message"
              >
                {{ message }}
              </div>
            </transition>
              <div class="error-list">
                <transition name="slide-fade" mode="out-in" appear>
                <div
                  class="alert alert-danger fade show mt-3"
                  role="alert"
                  v-if="error"
                >
                  {{ error }}
                </div>
                </transition>
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
  name: "Subjects",
  data: function() {
    return {
      email: "",
      level: null,
      subjects: [{ subject: "", degree: 0 }],
      message: "",
      error: ""
    };
  },
  methods: {
    async addNewSubjectForm() {
      this.subjects.push({
        subject: '',
        degree: 0
      })
    },
    async handlPostSubjects() {
      try {
        console.log( this.subjects);
        const token = await localStorage.getItem("token");
        const postSubject = {
          email: this.email,
          level: this.level,
          subjects: this.subjects
        };
        const response = await axios.post(
          "http://127.0.0.1:3000/admin/add-subjects",
          postSubject,
          {
            headers: {
              token: token,
            },
          }
        );
        this.message = response.data.message;
        this.error = "";
      } catch (error) {
        this.error = error.response.data;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-subject {
  text-align: center;
  margin-top: 6rem;
  h3 {
    margin-bottom: 2rem;
  }
  .btn {
    margin-top: 1rem;
  }
  .form-select {
    border-color: #ddd;
    border-radius: 0.3rem;
  }
}
</style>

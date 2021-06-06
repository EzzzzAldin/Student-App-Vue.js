<template>
  <div class="arrangemnt">
    <div class="container">
      <div class="row" v-if="students.length > 1">
        <div class="col-md-4"></div>
        <transition name="slide-fade" mode="out-in" appear>
        <div class="col-md-4">
          <div class="arrTaple">
            <div class="header">
              <h3>Arrangement Student</h3>
              <hr />
            </div>
            <div
              class="mt-3"
              :key="student"
              v-for="(student, index) in students"
            >
              <div>
                <div class="mb-3" style="max-width: 18rem;">
                  <div class="card-body">
                    <h5>
                      {{ index + 1 }}:
                      {{ student }}
                    </h5>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
            <div class="error-list">
              <div
                class="alert alert-danger alert-dismissible fade show mt-3"
                role="alert"
                v-if="error"
              >
                {{ error }}
              </div>
            </div>
          </div>
        </div>
        </transition>
        <transition name="slide-fade" mode="out-in" appear>
        <div class="col-md-4">
          <div class="info">
            <div class="nameimage">
              <span>{{ nameLogo }}</span>
            </div>
            <h3>{{ name }}</h3>
            <h3>Level {{ level }}</h3>
          </div>
        </div>
        </transition>
      </div>
      <transition name="slide-fade" mode="out-in" appear>
      <div v-if="students.length == 1">
        <div
          class="alert alert-danger  fade show mt-3"
          role="alert"
        >
          Your Data unavailable
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArrangementStudent",
  data: function() {
    return {
      students: "",
      nameLogo: "",
      name: "",
      level: null,
      error: "",
    };
  },
  async created() {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:3000/student/arrangement-student",
        {
          headers: {
            token: token,
          },
        }
      );
      this.students = response.data.students;
      const responseTwo = await axios.get(
        "http://127.0.0.1:3000/student/genral-data",
        {
          headers: {
            token: token,
          },
        }
      );
      this.name = responseTwo.data.name;
      this.level = responseTwo.data.Level;
      this.nameLogo = this.name.slice(0, 2).toUpperCase();
    } catch (error) {
      this.error = error.response.data;
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.arrTaple {
  margin-top: 1rem;
  text-align: center;
  background-color: #fff;
  padding: 20px;
  position: relative;
  text-align: center;
  border-radius: 1rem;
  .header {
    margin-bottom: 2rem;
    h3 {
      margin-top: 1rem;
    }
  }
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
  .card-body {
    padding: 0.1rem;
  }
}
.info {
  background-color: #fff;
  margin-left: 4rem;
  width: 100%;
  border-radius: 2rem;
  box-shadow: 0 0 5px #3f3c3c85;
  height: 80%;
  margin-top: 2rem;
  padding: 4rem;
  .nameimage {
    margin-top: 1rem;
    margin-bottom: 5rem;
    span {
      background-color: rgba(28, 62, 253, 0.2);
      color: #3f3b52;
      padding: 2rem;
      border-radius: 5rem;
      font-size: 2rem;
      font-weight: 700;
    }
  }
  h3 {
    font-weight: 700;
  }
}
</style>

<template>
  <div class="home-admin">
    <div class="container">
      <div class="admin-tools">
        <form>
          <div class="row">
            <div class="row student-tools col-lg-8 col-md-8 col-sm-9 col-xs-9">
              <div class="col-lg-6 col-md-6 col-sm-8 col-xs-9">
                <div>
                  <div class="card mb-3" style="max-width: 18rem;">
                    <div class="card-body">
                      <div class="icon">
                        <i class="fas fa-user-graduate"></i>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-dark btn-dark"
                        formaction="/student/data"
                      >
                        Data Of Student
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-8 col-xs-9">
                <div>
                  <div class="card mb-3" style="max-width: 18rem;">
                    <div class="card-body">
                      <div class="icon">
                        <i class="fas fa-list-ol"></i>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-dark btn-dark"
                        formaction="/student/arrangement-student"
                      >
                        Students ranked
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info col-lg-3 col-md-3 col-sm-2 col-xs-2">
              <div class="nameimage">
                <span>{{ nameLogo }}</span>
              </div>
              <h3>{{ name }}</h3>
              <h3>Level {{ level }}</h3>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "HomeStudent",
  data: function() {
    return {
      name: '',
      nameLogo: '',
      level: null,
      error: ''
    };
  },
    async created() {
      try {
        const token = await localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:3000/student/genral-data",
          {
            headers: {
              token: token,
            },
          }
        );
        this.name = response.data.name;
        this.level = response.data.Level;
        this.nameLogo = this.name.slice(0, 2).toUpperCase();
      } catch (error) {
        this.error = error.response.data;
        console.log(error);
      }
    },
};
</script>

<style lang="scss">
.admin-tools {
  margin-top: 5rem;
}
.student-tools {
  background-color: #fff;
  width: 68%;
  height: 50%;
  border-radius: 2rem;
  box-shadow: 0 0 5px #3f3c3c85;
  .card {
    margin-top: 3rem;
    font-size: 4rem;
    border-radius: 2rem;
    border: none;
    color: #3f3b52;
    background-color: rgba(28, 62, 253, 0.2);
    margin-left: 2.5rem;
    .btn {
      width: 75%;
      border-radius: 2rem;
      padding: 1rem;
      margin-bottom: 1rem;
      font-size: 1.2rem;
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

.info {
  background-color: #fff;
  margin-left: 4rem;
  width: 29%;
  border-radius: 2rem;
  box-shadow: 0 0 5px #3f3c3c85;
  .nameimage {
    margin-top: 5rem;
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

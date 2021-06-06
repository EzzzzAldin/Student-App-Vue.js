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
                        formaction="/admin/student-data"
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
                        <i class="fas fa-graduation-cap"></i>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-dark btn-dark"
                        formaction="/admin/add-level"
                      >
                        Add Level
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
                        <i class="fas fa-book"></i>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-dark btn-dark"
                        formaction="/admin/add-subjects"
                      >
                        Add Subjects
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
                        <i class="fas fa-clipboard"></i>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-dark btn-dark"
                        formaction="/admin/add-degrees"
                      >
                        Add Grades
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
              <h5>{{ status }}</h5>
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
  name: "HomeAdmin",
  data: function() {
    return {
      name: '',
      nameLogo: '',
      status: ''
    }
  },
  async created() {
    try {
        const token = await localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:3000/admin/data-admin",
          {
            headers: {
              token: token,
            },
          }
        );
        this.name = response.data.name;
        this.nameLogo = this.name.slice(0, 2).toUpperCase();
        this.status = response.data.status;
      } catch (error) {
        this.error = error.response.data;
        console.log(error);
      }
  }
};
</script>

<style lang="scss" scoped>
.student-tools {
  
}
.info {
  height: 20rem;
}
</style>

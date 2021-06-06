<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg">
      <i class="fas fa-book"></i>
      <div class="container-fluid">
        <a class="navbar-brand" href="/">StudentApp</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav d-flex">
            <router-link to="/" tag="li" class="nav-item" exact>
              <a class="nav-link active" aria-current="page" v-if="status"
                >Home</a
              >
            </router-link>
            <router-link to="/login" tag="li" class="nav-item">
              <a class="nav-link active" aria-current="page" v-if="!token"
                >Login</a
              >
            </router-link>
            <router-link to="/admin/register" tag="li" class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                v-if="status === 'Admin'"
                >Register</a
              >
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
    <div class="sidenav">
      <div v-if="status === 'Admin'">
        <div class="home">
          <a href="/"><i class="fas fa-home"></i></a>
        </div>
        <a href="/admin/student-data"><i class="fas fa-user-graduate"></i></a>
        <a href="/admin/add-level"><i class="fas fa-graduation-cap"></i></a>
        <a href="/admin/add-subjects"><i class="fas fa-book"></i></a>
        <a href="/admin/add-degrees"><i class="fas fa-clipboard"></i></a>
        <a href="/chat"><i class="fas fa-envelope"></i></a>
      </div>
      <div v-if="status === 'Student'">
        <div class="home">
          <a href="/"><i class="fas fa-home"></i></a>
        </div>
        <a href="/student/data"><i class="fas fa-user-graduate"></i></a>
        <a href="/student/arrangement-student"
          ><i class="fas fa-list-ol"></i
        ></a>
        <a href="/chat"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppHeader",
  data: function() {
    return {
      status: "",
      token: "",
    };
  },
  async created() {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:3000/user", {
        headers: {
          token: token,
        },
      });
      this.status = response.data.status;
      this.token = token;
    } catch (error) {
      console.log(error.response);
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  .svg-inline--fa.fa-w-14 {
    width: 1.875rem;
    height: 2rem;
    margin: 1rem;
  }
}
.container-fluid .navbar-brand {
  color: #1f1c2e;
  font-size: 1.5rem;
  font-weight: 700;
}

.navbar-collapse {
  position: absolute;
  left: 93%;
  transform: translatex(-50%);
  font-size: 1.3rem;
  font-weight: 700;
}
.navbar-nav .nav-item .nav-link {
  color: #3f3b52;
}

.navbar-nav .nav-item:hover .nav-link {
  color: #000;
}
.sidenav {
  height: 100%;
  width: 5rem;
  position: absolute;
  z-index: 1;
  top: 8rem;
  left: 0;
  overflow-x: hidden;
  margin-top: 8rem;
  .home {
    background-color: #3f3b52;
    border-radius: 1.9rem;
    text-align: center;
    margin-left: 1rem;
    width: 3rem;
    a {
      padding: 6px 14px 6px 10px;
      text-decoration: none;
      font-size: 1.5rem;
      color: #fff;
      display: block;
    }
  }
  .home:hover {
    transform: scale(0.9);
    animation-duration: 500ms;
    animation-fill-mode: forwards;
  }
  a {
    padding: 6px 14px 6px 16px;
    text-decoration: none;
    font-size: 2rem;
    color: #3f3b52;
    display: block;
    &:hover {
      transform: scale(0.9);
    animation-duration: 500ms;
    animation-fill-mode: forwards;
    }
  }
}
</style>

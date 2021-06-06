<template>
  <div class="home">
    <transition name="slide-fade" mode="out-in" appear>
    <HomeAdmin v-if="status === 'Admin'" />
    <HomeStudent v-if="status === 'Student'" />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeAdmin from "@/components/global/HomeAdmin.vue";
import HomeStudent from "@/components/global/HomeStudent.vue";
import axios from "axios";

export default {
  name: "Home",
  data: function() {
    return {
      status: ""
    }
  },
  methods: {
    refersh: function() {
      return window.history.go();
    }
  },
  watch: {
    // status: function() {
    //   location.reload();
    // }
  },
  async created() {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:3000/user", {
        headers: {
          token: token
        },
      });
      this.status = response.data.status;
    } catch (error) {
      console.log(error.response);
    }
  },
  components: {
    HomeAdmin,
    HomeStudent,
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.9s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(40px);
  opacity: 0;
}
</style>

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import RegisterAdmin from "../views/RegisterAdmin.vue";
import RegisterStudent from "../views/RegisterStudent.vue";
import Level from "../views/Level.vue";
import Subjects from "../views/Subjects.vue";
import Degrees from "../views/Degrees.vue";
import DataStudent from "../views/DataStudent.vue";
import CurrentDataStudent from "../views/CurrentDataStudent.vue";
import ArrangementStudent from "../views/ArrangementStudent.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      return token ? next() : next("/login");
    },
    meta: { title: 'Home' }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: 'Login' }
  },
  {
    path: "/admin/register",
    name: "Register",
    component: Register,
    meta: { title: 'Register' }
  },
  {
    path: "/admin/register-admin",
    name: "RegisterAdmin",
    component: RegisterAdmin,
    meta: { title: 'Register Admin' }
  },
  {
    path: "/admin/register-student",
    name: "RegisterStudent",
    component: RegisterStudent,
    meta: { title: 'Register student' }
  },
  {
    path: "/admin/add-level",
    name: "Level",
    component: Level,
    meta: { title: 'Add Level' }
  },
  {
    path: "/admin/add-subjects",
    name: "Subjects",
    component: Subjects,
    meta: { title: 'Add Subjects' }
  },
  {
    path: "/admin/add-degrees",
    name: "Degrees",
    component: Degrees,
    meta: { title: 'Add Grades' }
  },
  {
    path: "/admin/student-data",
    name: "DataStudent",
    component: DataStudent,
    meta: { title: 'Data Fo Student' }
  },
  {
    path: "/student/data",
    name: "CurrentDataStudent",
    component: CurrentDataStudent,
    meta: { title: 'Data Students' }
  },
  {
    path: "/student/arrangement-student",
    name: "ArrangementStudent",
    component: ArrangementStudent,
    meta: { title: 'Arrangement' }
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: { title: 'Chat' }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const DEFAULT_TITLE = 'Student-App';
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

export default router;

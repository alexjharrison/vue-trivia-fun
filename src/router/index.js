import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/question/:num",
    name: "Question",
    component: () => import("../views/Question")
  },
  {
    path: "/summary",
    name: "Summary",
    component: () => import("../views/Summary")
  },
  {
    path: "/",
    name: "Start",
    component: () => import("../views/Start")
  },
  {
    path: "*",
    redirect: { name: "Start" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

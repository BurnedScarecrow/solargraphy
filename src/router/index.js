import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Calc from "../views/Calculator.vue";
import Guide from "../views/Guide.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calc",
    name: "Calc",
    component: Calc,
  },
  {
    path: "/howto",
    name: "guide",
    component: Guide,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

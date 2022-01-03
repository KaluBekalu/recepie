import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Home from "../views/Home.vue";
import NewRecipe from "../views/NewRecipe.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { authRequired: true },
  },
  {
    path: "/new",
    name: "NewRecipe",
    component: NewRecipe,
    meta: { authRequired: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    return next();
  }
  if (!localStorage.getItem("auth-token")) {
    next("/");
  } else {
    next();
  }
});


export default router;

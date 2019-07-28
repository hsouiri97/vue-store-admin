import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import { fb } from "./firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: () => import("./views/Admin/Overview.vue")
        },
        {
          path: "products",
          name: "admin-products",
          component: () => import("./views/Admin/Products.vue")
        },
        {
          path: "orders",
          name: "admin-orders",
          component: () => import("./views/Admin/Orders.vue")
        },
        {
          path: "profile",
          name: "admin-profile",
          component: () => import("./views/Admin/Profile.vue")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/products",
      name: "products",
      component: () => import("./views/Products.vue")
    },
    {
      path: "/our-suppliers",
      name: "our-suppliers",
      component: () => import("./views/OurSuppliers.vue")
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("./views/Blog.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  }
  else {
    next() // make sure to always call next()!
  }
})

export default router;
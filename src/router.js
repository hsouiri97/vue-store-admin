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
          path: "products",
          name: "admin-products",
          meta: { requiresEmailVerified: true },
          component: () => import("./views/Admin/Products.vue")
        },
        {
          path: "orders",
          name: "admin-orders",
          meta: { requiresEmailVerified: true },
          component: () => import("./views/Admin/Orders.vue")
        },

        {
          path: "profile2",
          name: "admin-profile2",
          component: () => import("./views/Admin/Profile2.vue")
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
  const requiresEmailVerified = to.matched.some(
    record => record.meta.requiresEmailVerified
  );

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    {
      const emailVerified = currentUser.emailVerified;
      if (requiresEmailVerified && !emailVerified) {
        next("/admin/profile2");
      } else if (requiresEmailVerified && emailVerified) {
        next();
      } else {
        next();
      }
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;

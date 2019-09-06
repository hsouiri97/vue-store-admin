<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a id="show-sidebar" @click="toggleMenu" class="btn btn-sm btn-dark" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">Administration</a>
            <div id="close-sidebar" @click="toggleMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="../assets/admin/user.svg"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name">
                <strong>{{profile.name}}</strong>
              </span>
              <span class="user-role">{{email}}</span>
              <span class="user-status" v-if="emailVerified">
                <i class="fa fa-circle"></i>
                <span>Verified</span>
              </span>
              <span class="user-status" v-else>
                <i class="fa fa-circle" style="color:red;"></i>
                <span>Unverified</span>
              </span>
            </div>
          </div>
          <!-- sidebar-search  -->

          <!-- sidebar-menu  -->
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>

              <li>
                <router-link to="/admin/profile2">
                  <i class="fa fa-user"></i>
                  <span>Profil</span>
                </router-link>
              </li>

              <li>
                <router-link to="/admin/products">
                  <i class="fab fa-amazon"></i>
                  <span>Articles</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Commandes</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/archives">
                  <i class="fa fa-archive"></i>
                  <span>Archives</span>
                </router-link>
              </li>

              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>Se Déconnecter</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "admin",
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  },
  data() {
    return {
      profile: {
        name: null
      },
      email: null,
      uid: null,
      emailVerified: null
    };
  },
  components: {},
  methods: {
    toggleMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    var user = fb.auth().currentUser;
    var name, email;

    if (user != null) {
      this.name = user.displayName;
      this.email = user.email;
      this.uid = user.uid;
      this.emailVerified = user.emailVerified;
    }
  }
};
</script>
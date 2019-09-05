<template>
  <div>
    <nav class="navbar custom-nav navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Strong</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                Home
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/our-suppliers" class="nav-link">Our Suppliers</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/blog" class="nav-link">Blog</router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <a href="#" class="btn btn-outline-dark mr-sm-2">SHOP NOW</a>
            <a
              href="#"
              class="btn btn-outline-success my-2 my-sm-0"
              data-toggle="modal"
              data-target="#get-started"
            >Get Started</a>
          </form>
        </div>
      </div>
      <GetStarted />
    </nav>
  </div>
</template>

<script>
import GetStarted from "@/components/GetStarted.vue";
export default {
  name: "Navbar",
  components: {
    GetStarted
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom-nav {
  background-color: #fff;
}
</style>

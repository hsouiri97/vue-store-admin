<template>
  <div>
    <div class="home">
      <div class="home-welcome text-center mx-auto">
        <h1 class="display-1">Bienvenue...</h1>
        <button class="get-started-btn" @click="getStarted">S'identifier</button>
      </div>
      <div class="home-back"></div>
    </div>
    <GetStarted />
  </div>
</template>

<script>
// @ is an alias to /src
import GetStarted from "@/components/GetStarted.vue";

export default {
  name: "home",
  components: {
    GetStarted
  },
  methods: {
    getStarted() {
      $("#get-started").modal("show");
    }
  }
};
</script>

<style lang="scss">
.home-welcome {
  position: fixed;
  top: 30%;
  left: 30%;
  width: auto;
  height: auto;
  background: transparent;
  color: #fff;
  z-index: 999;
}

.home-back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* The image used */
  background-image: url("/img/jpg/home.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.get-started-btn {
  background: transparent;
  color: #de0dbb;
  border: 1px solid #de0dbb;
  font-size: 2rem;
  width: 15rem;
  height: 5rem;
  border-radius: 0.2rem;
}

.get-started-btn:hover {
  color: rgba(0, 0, 0, 0.8);
  background-color: #de0dbb;
}

.get-started-btn:focus {
  outline: none;
}
</style>

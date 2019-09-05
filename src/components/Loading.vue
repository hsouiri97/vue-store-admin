<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading {
  position: fixed; /* Stay in place */

  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */

  z-index: 9999;
  min-width: 100%;
  background: url("/img/gif/pacman.gif") no-repeat center center;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  //text-align: center;
}

.loadingGif {
  position: fixed;

  margin-right: 0 auto;
}
</style>
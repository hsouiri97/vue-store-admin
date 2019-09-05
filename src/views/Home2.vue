<template>
  <div class="home">
    <Navbar />
    <Hero />
    <Products />

    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="/img/png/1-about.png" alt class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!</p>
          <button class="btn btn-outline-dark mr-4">Browse Products</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Products from "@/sections/Products.vue";

export default {
  name: "home",
  components: {
    Hero,
    Products
  }
};
</script>

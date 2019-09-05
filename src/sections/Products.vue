<template>
  <div class="products" id="products" v-if="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products</h1>
      <div class="row">
        <div class="col-md-4" v-for="p in products" :key="p.id">
          <div class="card product-item">
            <Carousel :per-page="1" :autoplay="true" :autoplayHoverPause="true">
              <Slide v-for="(image,index) in p.images" :key="index">
                <img :src="image" class="card-img-top" alt="..." />
              </Slide>
            </Carousel>
            <div class="card-body">
              <h5 class="card-title">{{p.name}}</h5>
              <div class="d-flex justify-content-between">
                <div class="price">${{p.price}}</div>
                <AddToCart :id="p.id" :name="p.name" :price="p.price" :imgUrl="p.images[0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { Carousel, Slide } from "vue-carousel";
import AddToCart from "@/components/AddToCart.vue";

export default {
  name: "Products",
  components: {
    Carousel,
    Slide,
    AddToCart
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  data() {
    return {
      products: []
    };
  },
  created() {
    console.log(this.products);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}
.price {
  font-size: 20px;
  font-family: "sans-serif";
  text-decoration: none !important;
  color: #f9f9f9;
  background-color: #232b2b;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  width: 50%;
  /*text-transform: uppercase;*/
}

.card-title {
  height: 100px !important;
}
</style>
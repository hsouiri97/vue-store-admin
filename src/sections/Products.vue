<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products</h1>
      <div class="row">
        <div class="col-md-4">
          <a href="#" class="product-card">
            <div class="card product-item">
              <img src="/img/png/shirts/2.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Bayern Munchen Shirt</h5>
                <p
                  class="card-text"
                >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non nesciunt earum voluptatibus hic sint inventore?</p>
                <div class="price">799 MAD</div>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-4">
          <a href="#" class="product-card">
            <div class="card product-item">
              <img src="/img/png/shirts/3.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Barcelona Shirt</h5>
                <p
                  class="card-text"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut hic, explicabo est nesciunt voluptate porro!</p>
                <div class="price">799 MAD</div>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-4">
          <a href="#" class="product-card">
            <div class="card product-item">
              <img src="/img/png/shirts/4.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Man Utd Shirt</h5>
                <p
                  class="card-text"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nobis corrupti et, incidunt quidem praesentium.</p>
                <div class="price">799 MAD</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products"
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
  /*text-transform: uppercase;*/
}
.product-card {
  text-decoration: none;
  color: #232b2b;
}
</style>
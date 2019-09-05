<template>
  <div class="footer">
    <footer>
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12 segment-1 md-mb-30 sm-mb-30">
              <h3 class="third-h">Strong</h3>
              <p class="para">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In tempore,
                ad ut eos voluptatem quisquam repellendus doloremque voluptatibus sint laudantium.
              </p>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 segment-2 md-mb-30 sm-mb-30">
              <h2 class="second-h">Strong</h2>
              <ul></ul>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 segment-3 md-mb-30 sm-mb-30">
              <h2 class="second-h">Follow Us</h2>
              <p
                class="para"
              >Please Follow Us On Our Social Media Accounts In Order To Keep Updated.</p>
              <a href="#">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 segment-4 md-mb-30 sm-mb-30">
              <h2 class="second-h">Our Newsletter</h2>
              <p
                class="para"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eius ad tempora rem corporis, fugit harum quis sunt odio aliquam!</p>
              <form>
                <input type="email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p class="footer-bottom-text">All right reserved by &copy; xxxxxxx.2019</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.para {
  color: #999;
  line-height: 25px;
}

.third-h,
.second-h {
  color: #fff;
  font-size: 18px;
}

.footer-top {
  background: #111;
  padding: 80px 0;
}

.segment-1 h3 {
  font-family: Courgette;
  letter-spacing: 3px;
  margin: 10px 0;
}

.second-h {
  font-family: Poppins;
  text-transform: uppercase;
}

.second-h::before {
  content: "|";
  padding-right: 10px;
  color: #c65039;
}

.segment-2 ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.segment-2 ul li {
  border-bottom: 1px solid rgba($color: white, $alpha: 0.3);
  margin-top: 10px;
}

.segment-2 ul li a {
  text-decoration: none;
  color: #999;
}

.segment-3 a {
  background: #494848;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  margin: 0px 10px 10px 0px;
}

.segment-3 a i {
  font-size: 20px;
  color: #fff;
  padding: 10px 12px;
}

.segment-4 form button[type="submit"] {
  background: #c65039;
  border: none;
  border-radius: 5px;
  padding: 3px 15px;
  margin-top: 5px;
  text-transform: uppercase;
  color: #fff;
}

.footer-bottom-text {
  background: black;
  line-height: 75px;
  color: white;
  text-align: center;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .md-mb-30 {
    margin-bottom: 30px;
  }

  .footer-top {
    padding: 50px 0;
  }
}

@media only screen and (max-width: 767px) {
  .sm-mb-30 {
    margin-bottom: 30px;
  }

  .footer-top {
    padding: 50px 0;
  }
}
</style>
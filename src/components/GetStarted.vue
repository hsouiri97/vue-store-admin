<template>
  <div class="get-started-class">
    <!-- Modal -->
    <div
      class="modal fade"
      id="get-started"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                >Login</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-register-tab"
                  data-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                >Signup</a>
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
              >
                <h5 class="text-center">Login Please</h5>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="email"
                  />
                  <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="password"
                    @keyup.enter="login"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-dark" @click="login">Login</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Create New Account</h5>

                <div class="form-group">
                  <label for="name">Your name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="name"
                    placeholder="Full Name"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-dark" @click="register">Signup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "GetStarted",
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          $("#get-started").modal("hide");
          console.log(user.user.uid);
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              name: this.name,
              country: null,
              region: null,
              phone: null,
              address: null,
              zipCode: null,
              imgUrl: null
            });
          this.$router.replace("admin/profile2");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert("errorCode: " + errorCode + "\nerrorMessage: " + errorMessage);
        });
    },
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $("#get-started").modal("hide");
          this.$router.replace("admin/profile2");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(
            "error code: " + errorCode + "\nerror message: " + errorMessage
          );
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
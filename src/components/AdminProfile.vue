<template>
  <div>
    <div class="container emp-profile">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
              alt
            />
            <div class="file btn btn-lg btn-primary">
              Change Photo
              <input type="file" name="file" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile-head">
            <h5>{{profile.name}}</h5>
            <h6 v-if="account.verifiedEmail">Email Verified</h6>
            <p v-else class="text-danger font-weight-bold">
              Your Email is not verified
              <button
                @click="verifyEmail"
                class="btn btn-danger"
              >Click here to do so.</button>
            </p>
            <p class="proile-rating">
              RANKINGS :
              <span>8/10</span>
            </p>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >About</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >Settings</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2">
          <button class="profile-edit-btn">Edit Profile</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="profile-work"></div>
        </div>
        <div class="col-md-8">
          <div class="tab-content profile-tab" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div class="row">
                <div class="col-md-6">
                  <label>User Id</label>
                </div>
                <div class="col-md-6">
                  <p>Kshiti123</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Name</label>
                </div>
                <div class="col-md-6">
                  <p>Kshiti Ghelani</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Email</label>
                </div>
                <div class="col-md-6">
                  <p>kshitighelani@gmail.com</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Phone</label>
                </div>
                <div class="col-md-6">
                  <p>123 456 7890</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Profession</label>
                </div>
                <div class="col-md-6">
                  <p>Web Developer and Designer</p>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="row">
                <div class="col-md-6">
                  <label>Experience</label>
                </div>
                <div class="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Hourly Rate</label>
                </div>
                <div class="col-md-6">
                  <p>10$/hr</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Total Projects</label>
                </div>
                <div class="col-md-6">
                  <p>230</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>English Level</label>
                </div>
                <div class="col-md-6">
                  <p>Expert</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Availability</label>
                </div>
                <div class="col-md-6">
                  <p>6 months</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label>Your Bio</label>
                  <br />
                  <p>Your detail description</p>
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

//Configuring the toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});

const user = fb.auth().currentUser;

export default {
  name: "AdminProfile",
  firestore() {
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  },
  data() {
    return {
      profile: {
        name: null,
        country: null,
        region: null,
        phone: null,
        address: null,
        imgUrl: null
      },
      account: {
        email: null,
        emailVerified: null
      }
    };
  },
  methods: {
    verifyEmail() {
      Swal.fire({
        title: "A confirmation email will be sent to " + user.email,
        text: "click Ok to confirm it.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6DD1DA",
        cancelButtonColor: "#EC1F94",
        confirmButtonText: "Ok"
      }).then(result => {
        if (result.value) {
          console.log(user);
          user
            .sendEmailVerification()
            .then(() => {
              Toast.fire({
                type: "success",
                title: "Check your email to verify your account."
              });
            })
            .catch(error => {
              console.log("error sending verification email");
              console.log(error);
            });
        }
      });
    }
  },
  mounted() {
    var user = fb.auth().currentUser;
    var name, email;

    if (user != null) {
      this.account.email = user.email;
      this.account.emailVerified = user.emailVerified;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.emp-profile {
  padding: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 0.5rem;
  background: #fff;
}
.profile-img {
  text-align: center;
}
.profile-img img {
  width: 70%;
  height: 100%;
}
.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}
.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}
.profile-head h5 {
  color: #333;
}
.profile-head h6 {
  color: #0062cc;
}
.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 70%;
  padding: 2%;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}
.proile-rating {
  font-size: 12px;
  color: #818182;
  margin-top: 5%;
}
.proile-rating span {
  color: #495057;
  font-size: 15px;
  font-weight: 600;
}
.profile-head .nav-tabs {
  margin-bottom: 5%;
}
.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}
.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}

.profile-tab label {
  font-weight: 600;
}
.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}
</style>

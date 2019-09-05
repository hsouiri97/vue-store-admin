<template>
  <div class="profile">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Profile settings</h3>

            <p>Change your profile settings here</p>
          </div>
          <div class="col-md-5">
            <img src="../../assets/admin/profile.svg" width="300" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >Profile</a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              id="account-tab"
              data-toggle="tab"
              href="#account"
              role="tab"
              aria-controls="account"
              aria-selected="false"
            >Account settings</a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <!--profile tab -->
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name
                      v-model="profile.name"
                      placeholder="Full name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <VuePhoneNumberInput v-model="profile.phone" default-country-code="MA" />
                  </div>
                </div>

                <div class="col_md-6">
                  <div class="form-group" id="country-select">
                    <country-select
                      v-model="profile.country"
                      :country="profile.country"
                      topCountry="MA"
                      class="form-control"
                      id="country-select"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group" id="region-select">
                    <region-select
                      v-model="profile.region"
                      :country="profile.country"
                      :region="profile.region"
                      :regionName="true"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.address"
                      placeholder="Address"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.zipCode"
                      placeholder="Zipcode"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="form-group">
                    <button class="btn btn-info w-100">Edit</button>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateProfile"
                      value="Save Changes"
                      class="btn btn-success w-100"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <button class="btn btn-dark w-100">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end profile tab -->

          <!-- account settings tab -->
          <div
            class="tab-pane fade pt-3"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <button @click="verifyEmail" class="btn btn-success w-100">Verify Your Account</button>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <button @click="resetPassword" class="btn btn-danger w-100">Change Your Password</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end account settings tab -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../../firebase";

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
        address: null
      },
      account: {
        name: null,
        email: user.email,
        password: null,
        confirmPassword: null
      }
    };
  },
  methods: {
    updateProfile() {
      this.profile.updatedAt = new Date().toString();
      this.$firestore.profile.update(this.profile);

      Toast.fire({
        type: "success",
        title: "Product updated successfully"
      });
    },
    uploadImage() {},
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
            });
        }
      });
    },
    resetPassword() {
      const auth = fb.auth();
      Swal.fire({
        title: "A reset password email will be sent to " + user.email,
        text: "click Ok to confirm it.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6DD1DA",
        cancelButtonColor: "#EC1F94",
        confirmButtonText: "Ok"
      }).then(result => {
        if (result.value) {
          auth
            .sendPasswordResetEmail(user.email)
            .then(() => {
              Toast.fire({
                type: "success",
                title: "Check your email to reset your password."
              });
            })
            .catch(error => {
              console.log("error sending reset password email");
            });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#country-select {
  padding-left: 14px;
}

#region-select {
  padding-left: 56px;
}
</style>
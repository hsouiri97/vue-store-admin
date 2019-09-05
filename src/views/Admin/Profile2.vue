<template>
  <div class="profile2">
    <div class="container emp-profile">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img">
            <img :src="profile.imgUrl" class="img-fluid" />
            <div class="file btn btn-lg btn-primary">
              Changer la Photo
              <input type="file" name="file" @change="uploadImage" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile-head">
            <h5>{{profile.name}}</h5>
            <p
              v-if="account.emailVerified"
              class="text-success font-weight-bold text-capitalize"
            >utilisateur vérifié</p>
            <p v-else class="text-danger font-weight-bold text-capitalize">
              Votre email n'est pas vérifié
              <button
                @click="verifyEmail"
                class="btn btn-danger"
              >Cliquez ici pour le vérifier.</button>
            </p>

            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active text-capitalize"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >à propos</a>
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
                >Paramètres</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2">
          <button
            class="profile-edit-btn"
            data-toggle="modal"
            data-target="#editUserData"
          >Modifier votre profil</button>
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
                  <label>Nom</label>
                </div>
                <div class="col-md-6">
                  <p>{{profile.name}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Pays</label>
                </div>
                <div class="col-md-6">
                  <p>{{profile.country}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Région</label>
                </div>
                <div class="col-md-6">
                  <p>{{profile.region}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Téléphone</label>
                </div>
                <div class="col-md-6">
                  <p>{{profile.phone}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Addresse</label>
                </div>
                <div class="col-md-6">
                  <p>{{profile.address}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Code postale</label>
                </div>
                <div class="col-md-6">
                  <p>{{profile.zipCode}}</p>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="container">
                <div class="row" v-if="!account.emailVerified">
                  <div class="col-md-12">
                    <div class="form-group">
                      <button
                        @click="verifyEmail"
                        class="btn btn-success w-100 form-control"
                      >Vérifiez votre compte</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <button
                        @click="resetPassword"
                        class="btn btn-danger w-100 form-control"
                      >Modifier votre mot de passe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editUserData"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Your Profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
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
              </div>
              <div class="row">
                <div class="col-md-6">
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
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <vue-tel-input
                      v-model="profile.phone"
                      aria-placeholder="Enter Your Phone Number"
                    ></vue-tel-input>
                  </div>
                </div>
              </div>
              <div class="row">
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
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <input
                      type="number"
                      v-model="profile.zipCode"
                      placeholder="Zipcode"
                      class="form-control w-100"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <button @click="updateProfile" class="btn btn-primary w-100">Save Changes</button>
                </div>
                <div class="col-md-3">
                  <button
                    @click="resetProfile"
                    class="btn btn-dark w-100"
                    data-dismiss="modal"
                  >Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      class="modal fade"
      id="profileImageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="previewUrl" class="img-fluid" />
            <br />
            <br />
            <div class="progress" style="height: 10px;">
              <div
                class="progress-bar bg-success progress-bar-striped progress-bar-animated"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                id="imgProgress"
              ></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Cancel</button>
          </div>
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
  name: "Profile2",
  firestore() {
    console.log("from firestore: " + user.uid);
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
        zipCode: null,
        imgUrl: null
      },
      account: {
        email: null,
        emailVerified: null
      },
      progress: null,
      previewUrl: null
    };
  },
  methods: {
    updateProfile() {
      this.profile.updatedAt = new Date().toString();
      this.$firestore.profile.update(this.profile);
      $("#editUserData").modal("hide");

      Toast.fire({
        type: "success",
        title: "Your Profile updated successfully"
      });
    },
    resetProfile() {
      this.$binding("Profile", db.collection("profiles").doc(user.uid))
        .then(profile => {
          //console.log(profile);
          this.profile = profile; // => __ob__: Observer
        })
        .catch(err => {
          console.error(err);
        });
    },

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
    },
    uploadImage(e) {
      var file = e.target.files[0];
      var storageRef = fb.storage().ref();

      if (file) {
        this.previewUrl = URL.createObjectURL(file);
        var uploadTask = storageRef
          .child("profiles/images/" + file.name + this.getFormattedTime())
          .put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {
            var progress = parseInt(
              (100.0 * snapshot.bytesTransferred) / snapshot.totalBytes
            );

            this.moveProgress(progress);
            console.log("Upload is " + progress + "% done");
            //this.moveProgress(progress);
            //this.progress = progress;
          },
          error => {
            console.log("error uploading profile image: " + error);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log("Profile Image available at", downloadURL);
              this.profile.imgUrl = downloadURL;
              this.$firestore.profile.update(this.profile);
            });
          }
        );
      }
    },
    moveProgress(progress) {
      $("#profileImageModal").modal("show");
      //$("#imgProgress").style.width = progress + "%";

      $("#imgProgress").css("width", progress + "%");
      if (progress == 100) {
        $("#profileImageModal").modal("hide");
      }
    },

    getFormattedTime() {
      var today = new Date();
      var y = today.getFullYear();
      // JavaScript months are 0-based.
      var m = today.getMonth() + 1;
      var d = today.getDate();
      var h = today.getHours();
      var mi = today.getMinutes();
      var s = today.getSeconds();
      return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
    }
  },
  created() {
    var user = fb.auth().currentUser;
    var name, email;

    console.log(user.uid);

    if (user != null) {
      this.account.email = user.email;
      this.account.emailVerified = user.emailVerified;
    }
    this.$binding("profile", db.collection("profiles").doc(user.uid))
      .then(profile => {
        console.log(profile);
        this.profile = profile; // => __ob__: Observer
      })
      .catch(err => {
        console.error(err);
      });
  },
  mounted() {
    //resetProfile();
    $("#editUserData").on("hidden.bs.modal", e => {
      this.resetProfile();
    });
    //this.moveProgress(3);
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
  //background: #fff;
  background: -webkit-linear-gradient(left, #f7f8f8, #acbb78);
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
  cursor: pointer;
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
  width: 100%;
  padding: 2%;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}
.profile-edit-btn:focus {
  outline: none;
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

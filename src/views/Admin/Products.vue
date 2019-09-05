<template>
  <div class="products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Page Articles</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.</p>
          </div>
          <div class="col-md-6">
            <img src="../../assets/admin/products.svg" alt class="img-fluid" />
          </div>
        </div>

        <hr />
        <h3>Vos Articles</h3>

        <button @click="addNewProduct()" class="btn btn-info float-right">Ajouter un nouveau article</button>

        <br />
        <br />

        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Nom</th>
                <th>Prix unitaire</th>
                <th>quantité</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" v-bind:key="product.id">
                <td>{{product.title}}</td>
                <td>{{product.price}}</td>
                <td>{{product.quantity}}</td>
                <td>
                  <button @click="editProduct(product)" class="btn btn-info">Modifier</button>
                  <button @click="deleteProduct(product)" class="btn btn-warning">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Product adding & editing Modal -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addLabel" v-if="modal == 'new'">Ajouter un nouveau article</h5>
            <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">Modifier l'article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Nom d'article"
                    v-model="product.title"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <vue-editor v-model="product.info">Description</vue-editor>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Détails d'article</h4>
                <hr />

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Marque d'article"
                    v-model="product.company"
                    class="form-control"
                  />
                </div>

                <div class="form-group text-capitalize">
                  <select v-model="product.type" class="form-control">
                    <option disabled :value="null">type:</option>
                    <option value="nouveau">nouveau smartphone</option>
                    <option value="reconditionné">smartphone reconditionné</option>
                    <option value="accessoire">accessoire</option>
                  </select>
                </div>

                <div class="form-group">
                  <input
                    type="number"
                    placeholder="Prix unitaire"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="number"
                    placeholder="Quantité"
                    v-model="product.quantity"
                    class="form-control"
                  />
                </div>

                <!-- <div class="form-group d-flex" v-if="previewUrls.length>0">
                  <div class="p-1" v-for="url in previewUrls">
                    <div class="img-wrapp">
                      <span class="delete-img" @click="deleteImage(image,index)">X</span>
                      <img :src="url" alt width="80px" />
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="form-group d-flex" v-if="product.images">
                    <div class="p-1" v-for="url in product.images">
                      <div class="img-wrapp">
                        <span class="delete-img" @click="deleteImage(image,index)">X</span>
                        <img :src="url" alt width="80px" />
                      </div>
                    </div>
                  </div>
                </div>-->
                <div class="form-group">
                  <div>
                    <button
                      class="btn btn-info"
                      v-if="modal === 'new'"
                      @click="showImagesModal"
                    >Ajouter des images</button>
                    <button
                      class="btn btn-info"
                      v-if="modal === 'edit'"
                      @click="showImagesModal"
                    >Modifier les images</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <div class="mr-auto loadingGif">
              <img
                src="/img/gif/pacman.gif"
                alt="loading"
                class="img-fluid mb-auto"
                v-if="isProgress"
              />
            </div>-->

            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              @click="saveNewProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >Ajouter l'article</button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >Appliquer les modifications</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end products modal -->
    <!--images modal -->
    <div
      class="modal fade"
      id="images-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="images-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLongTitle"
              v-if="modal === 'new'"
            >Ajouter des image</h5>
            <h5
              class="modal-title"
              id="exampleModalLongTitle"
              v-if="modal === 'edit'"
            >Modifier les images</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div v-if="modal === 'edit'">
                <div class="row" v-if="product.images.length > 0">
                  <div class="col-md-4" v-for="(image, index) in product.images" :key="index">
                    <span class="imageX">
                      <p @click="removeImageFromStorage(image, index)">X</p>
                    </span>
                    <img :src="image" class="img-fluid" />
                  </div>
                </div>
                <div class="row" v-if="previewUrls.length > 0">
                  <div class="col-md-4" v-for="(url, index) in previewUrls" :key="index">
                    <span class="imageX">
                      <p @click="removePreviewImage(index)">X</p>
                    </span>
                    <img :src="url" class="img-fluid" />
                  </div>
                </div>
              </div>
              <div v-if="modal === 'new'">
                <div class="row" v-if="previewUrls.length > 0">
                  <div class="col-md-4" v-for="(url, index) in previewUrls" :key="index">
                    <span class="imageX">
                      <p @click="removePreviewImage(index)">X</p>
                    </span>
                    <img :src="url" class="img-fluid" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-12 col-lg-12 mx-auto">
                  <div class="input-group my-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Upload</span>
                    </div>
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="imgsInputFile"
                        accept=".jpg, .jpeg, .png"
                        @change="selectImages"
                        multiple
                      />
                      <label class="custom-file-label" for="imgsInputFile">Choisir le fichier</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideImgModal('cancel')">Annuler</button>
            <button type="button" class="btn btn-primary" @click="hideImgModal('confirm')">Confirmer</button>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="isProgress" />

    <!--endimages modal -->
  </div>
</template>

<script>
import { fb, db } from "../../firebase";
import { VueEditor } from "vue2-editor";
import Loading from "../../components/Loading";
//import { Promise, reject } from "q";
//import { resolve } from "dns";

//Configuring the toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});

export default {
  name: "AdminProducts",

  components: {
    VueEditor,
    Loading
  },

  data() {
    return {
      products: [],
      product: {
        id: null,
        title: null,
        info: null,
        quantity: null,
        price: null,
        images: [],
        created_at: null,
        company: null,
        type: null
      },
      activeItem: null,
      modal: null,
      tag: null,
      previewUrls: [],
      imgFiles: [],
      isProgress: false
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    addNewProduct() {
      this.modal = "new";
      $("#productModal").modal("show");
    },

    async saveNewProduct() {
      var urls = await this.uploadImages();
      //that code below should be executed only if the function above finished its work properly
      this.product.created_at = new Date().toString();
      //converting values
      this.product.price = parseFloat(this.product.price);
      this.product.quantity = parseFloat(this.product.quantity);
      this.product.count = 0;
      this.product.inCart = false;
      this.product.total = 0;
      console.log("urls length: " + urls.length);
      if (urls) {
        this.isProgress = false;
        urls.forEach(url => {
          console.log("from save product: " + url);
        });
        this.product.images = urls;
      }
      this.$firestore.products.add(this.product);
      $("#productModal").modal("hide");
      Toast.fire({
        type: "success",
        title: "Product added successfully"
      });
    },
    readData() {
      this.$firestore.products.add(this.product);
    },

    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EC1F94",
        cancelButtonColor: "#6DD1DA",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          console.log("delete func: " + doc.id);
          this.$firestore.products.doc(doc.id).delete();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    editProduct(doc) {
      this.product = doc;
      this.modal = "edit";
      $("#productModal").modal("show");
      //console.log("this.product : " + JSON.stringify(this.product));
    },
    async updateProduct() {
      var urls = await this.uploadImages();

      this.product.updateed_at = new Date().toString();

      if (urls) {
        urls.forEach(url => {
          console.log("from save product: " + url);
          this.isProgress = false;
          this.product.images.push(url);
        });
      }

      this.$firestore.products.doc(this.product.id).update(this.product);
      $("#productModal").modal("hide");
      Toast.fire({
        type: "success",
        title: "Product updated successfully"
      });
    },
    addProductId(id) {
      this.$firestore.products.doc(id).update({
        id: id
      });
    },

    // addTag() {
    //   console.log(this.tag);
    //   this.product.tags.push(this.tag);
    //   this.tag = "";
    // },
    selectImages(e) {
      console.log("from select images: ", e.target.files.length);
      for (var i = 0; i < e.target.files.length; i++) {
        this.imgFiles.push(e.target.files[i]);
        this.previewUrls.push(URL.createObjectURL(e.target.files[i]));
      }
      //var image = e.target.files[0];
      //console.log(image);
      //this.product.images.push(image);
    },
    uploadImages() {
      var storageRef = fb.storage().ref();
      var urls = [];

      console.log("from upload images: ", this.imgFiles.length);
      return new Promise(resolve => {
        if (this.imgFiles) {
          if (this.imgFiles.length > 0) {
            this.isProgress = true;
            this.imgFiles.forEach(img => {
              var uploadTask = storageRef
                .child("products/images/" + this.formatDate() + img.name)
                .put(img);
              uploadTask.on(
                "state_changed",
                snapshot => {
                  var progress =
                    (100.0 * snapshot.bytesTransferred) / snapshot.totalBytes;
                  console.log("Upload is " + progress + "% done");
                },
                error => {
                  console.log("there is an error uploading product images");
                },
                () => {
                  uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    //console.log("File available at", downloadURL);
                    urls.push(downloadURL);
                    if (urls.length == this.imgFiles.length) {
                      resolve(urls);
                    }
                  });
                }
              );
            });
          } else {
            resolve(urls);
          }
        } else {
          resolve(urls);
        }
      });
    },

    resetProduct() {
      this.product = {
        id: null,
        title: null,
        info: null,
        quantity: null,
        price: null,
        images: [],
        created_at: null,
        company: null,
        type: null
      };
      this.activeItem = null;
      this.modal = null;
      this.tag = null;
      this.previewUrls = [];
      this.imgFiles = [];
      $("#inputImage").val("");
    },

    showImagesModal() {
      $("#images-modal").modal("show");
    },

    removePreviewImage(index) {
      console.log(index);
      if (this.previewUrls.length > 0) {
        this.previewUrls.splice(index, 1);
        this.imgFiles.splice(index, 1);
      }
    },

    removeImageFromStorage(imgName, index) {
      var imgRef = fb.storage().refFromURL(imgName);

      imgRef
        .delete()
        .then(() => {
          console.log("success from removeImageFromStorage");
          this.product.images.splice(index, 1);
          this.$firestore.products.doc(this.product.id).update(this.product);
        })
        .catch(error => {
          console.log("error from removeImageFromStorage");
        });
    },
    hideImgModal(option) {
      if (option === "confirm") {
        $("#images-modal").modal("hide");
      } else if (option === "cancel") {
        this.imgFiles = [];
        this.previewUrls = [];
        $("#images-modal").modal("hide");
      }
    },
    formatDate() {
      let now = new Date().getTime();
      let milliSeconds = new Date().getMilliseconds();
      //console.log(now.getTime().toString());
      return now + milliSeconds;
    }
  },
  created() {
    console.log("created" + this.products.length);
    this.formatDate();
  },
  mounted() {
    $("#productModal").on("hidden.bs.modal", e => {
      this.resetProduct();
    });
  },
  updated() {
    console.log("updated" + this.products.length);
    this.products.forEach(p => {
      //console.log("the id from updated: " + p.id);
      this.addProductId(p.id);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.imageX p {
  cursor: pointer;
}

.imageX p:hover {
  color: red;
}
</style>
<template>
  <div class="archive">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Page des archives</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos laudantium sit doloremque fugit ea cum voluptas eveniet, minus voluptatem nostrum ab provident soluta non distinctio praesentium dolore, unde vel ullam!</p>
          </div>
          <div class="col-md-6">
            <img src="../../assets/admin/archives.svg" alt class="img-fluid" />
          </div>
        </div>
        <hr />
        <h3>Vos Commandes</h3>

        <br />
        <br />

        <div class="table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Nom du client</th>
                <th>Nombre de produits</th>
                <th>Date Créée</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(archive, index) in archives" v-bind:key="index">
                <td>{{archive.client.address.recipient_name}}</td>
                <td>{{archive.order.length}}</td>
                <td>{{archive.dateCreated}}</td>

                <td>
                  <button class="btn btn-info" @click="showDetails(index)">Plus de details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div
      id="details-modal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Details de la commande</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="container">
              <!-- Client details -->
              <div class="row">
                <h3>Détails du client:</h3>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="text-capitalize">
                      <tr>
                        <th>nom</th>
                        <th>email</th>
                        <th>ville</th>
                        <th>pays</th>
                        <th>addresse</th>
                        <th>code postale</th>
                      </tr>
                    </thead>
                    <tbody v-if="client">
                      <tr>
                        <td>{{client.name}}</td>
                        <td>{{client.email}}</td>
                        <td>{{client.city}}</td>
                        <td>{{client.country}}</td>
                        <td>{{client.address}}</td>
                        <td>{{client.zipCode}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- End Client details -->
              <!-- Order Products-->
              <div class="row">
                <h3>Produits de la commande:</h3>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="text-capitalize">
                      <tr>
                        <th>nom du produit</th>
                        <th>prix unitaire</th>
                        <th>quantité</th>
                        <th>quantité totale (Au moment de l'achat)</th>
                        <th>total</th>
                      </tr>
                    </thead>
                    <tbody v-if="archive">
                      <tr v-for="(p) in archive" :key="p.id">
                        <td>{{p.name}}</td>
                        <td>{{p.unitPrice}}</td>
                        <td>{{p.quantity}}</td>
                        <td>{{p.totalQuantity}}</td>
                        <td>
                          {{p.total}}
                          <span class="ml-1">DH</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>

                        <td class="table-danger">
                          <strong>
                            <em>
                              {{archiveTotal}}
                              <span class="ml-1">DH</span>
                            </em>
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- End Order Products-->
            </div>
          </div>
          <!-- End Modal Body -->
        </div>
      </div>
    </div>
    <!-- end Details Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  name: "AdminArchives",
  data() {
    return {
      archives: [],
      clients: [],
      archivesProducts: [],
      archivesTotals: [],
      client: null,
      archive: [],
      archiveTotal: null,
      currentArchive: {}
    };
  },
  firestore() {
    return {
      archives: db.collection("orders").where("archived", "==", true)
    };
  },
  methods: {
    showDetails(index) {
      this.client = this.clients[index];
      this.archive = this.archivesProducts[index];
      this.archiveTotal = this.archivesTotals[index];
      this.currentArchive = this.archives[index];
      $("#details-modal").modal("show");
    },
    reset() {
      this.client = null;
      this.archive = [];
      this.archiveTotal = null;
    }
  },
  mounted() {
    $("#details-modal").on("hidden.bs.modal", e => {
      this.reset();
    });
  },
  updated() {
    if (this.archives.length > 0) {
      this.clients = this.archives.map(archive => {
        return {
          name: archive.client.address.recipient_name,
          email: archive.client.email,
          city: archive.client.address.city,
          country: archive.client.address.country_code,
          address:
            archive.client.address.line1 +
            (archive.client.address.line2
              ? "\n" + archive.client.address.line2
              : ""),
          zipCode: archive.client.address.postal_code
        };
      });

      this.archivesProducts = this.archives.map(item => item.order);
      this.archivesTotals = this.archives.map(item => item.orderTotal);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

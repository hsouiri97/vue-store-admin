<template>
  <div class="orders">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Page des commandes</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos laudantium sit doloremque fugit ea cum voluptas eveniet, minus voluptatem nostrum ab provident soluta non distinctio praesentium dolore, unde vel ullam!</p>
          </div>
          <div class="col-md-6">
            <img src="../../assets/admin/orders.svg" alt class="img-fluid" />
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
                <th>Date Created</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in orders" v-bind:key="index">
                <td>{{order.client.address.recipient_name}}</td>
                <td>{{order.order.length}}</td>
                <td>{{order.dateCreated}}</td>

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
                        <th>quantité d'entrepôt (Maintenant)</th>
                        <th>total</th>
                      </tr>
                    </thead>
                    <tbody v-if="order">
                      <tr v-for="(p) in order" :key="p.id">
                        <td>{{p.name}}</td>
                        <td>{{p.unitPrice}}</td>
                        <td>{{p.quantity}}</td>
                        <td>{{p.totalQuantity}}</td>
                        <td>{{(tempProducts.filter(item => item.id === p.id)).map(p => p.quantity)[0]}}</td>
                        <td>
                          {{p.total}}
                          <span class="ml-1">DH</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5"></td>

                        <td class="table-danger">
                          <strong>
                            <em>
                              {{orderTotal}}
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
          <!-- End Modal Body -->
          <!-- Modal Footer -->
          <div class="modal-footer">
            <button
              v-if="!currentOrder.accepted"
              type="button"
              class="btn btn-primary"
              @click="accept"
            >Accepter</button>
            <button v-else type="button" class="btn btn-danger" @click="archive">Archiver</button>
          </div>
          <!-- Modal Footer -->
        </div>
      </div>
    </div>
    <!-- end Details Modal -->
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  name: "AdminOrders",
  data() {
    return {
      orders: [],
      clients: [],
      ordersProducts: [],
      ordersTotals: [],
      client: null,
      order: [],
      orderTotal: null,
      currentOrder: {},
      products: [],
      tempProducts: []
    };
  },
  firestore() {
    return {
      orders: db.collection("orders").where("archived", "==", false),
      products: db.collection("products")
    };
  },
  methods: {
    showDetails(index) {
      this.client = this.clients[index];
      this.order = this.ordersProducts[index];
      this.orderTotal = this.ordersTotals[index];
      this.currentOrder = this.orders[index];

      this.order.map(item => {
        this.tempProducts.push(...this.products.filter(p => p.id === item.id));
      });

      /*this.order.map(items => {
        items.map(item => {
          console.log("item.id: ", item.id);

          this.tempProducts = [
            "",
            ...this.products.filter(p => p.id === item.id)
          ];
        });
      });*/

      $("#details-modal").modal("show");
    },
    reset() {
      this.client = null;
      this.order = [];
      this.orderTotal = null;
      this.tempProducts = [];
    },

    accept() {
      //let tempProducts = [];
      this.order.map(item => {
        const totalQuantity = this.tempProducts
          .filter(p => p.id === item.id)
          .map(product => product.quantity)[0];
        const quantity = item.quantity;

        if (totalQuantity >= quantity) {
          let newQuantity = totalQuantity - quantity;
          console.log(totalQuantity, quantity, newQuantity);

          this.$firestore.products.doc(item.id).update({
            quantity: newQuantity
          });
          // this.$firestore.orders.doc(this.currentOrder.id).update({
          //   accepted: true
          // });
          return db
            .collection("orders")
            .doc(this.currentOrder.id)
            .update({
              accepted: true
            })
            .then(() => {
              console.log("Document successfully updated! from accept");
              $("#details-modal").modal("hide");
            })
            .catch(error => {
              // The document probably doesn't exist.
              console.error("Error updating document from accept: ", error);
            });
        } else {
          alert(
            "Vous ne pouvez pas accepter cette commande, la quantité de produit dans votre entrepôt n'est pas suffisante."
          );
          $("#details-modal").modal("hide");
        }
      });
    },
    archive() {
      return db
        .collection("orders")
        .doc(this.currentOrder.id)
        .update({
          archived: true
        })
        .then(() => {
          console.log("Document successfully updated! from archive");
          $("#details-modal").modal("hide");
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error updating document from archive: ", error);
        });
    }
  },
  mounted() {
    $("#details-modal").on("hidden.bs.modal", e => {
      this.reset();
    });
  },
  updated() {
    if (this.orders.length > 0) {
      this.clients = this.orders.map(order => {
        return {
          name: order.client.address.recipient_name,
          email: order.client.email,
          city: order.client.address.city,
          country: order.client.address.country_code,
          address:
            order.client.address.line1 +
            (order.client.address.line2
              ? "\n" + order.client.address.line2
              : ""),
          zipCode: order.client.address.postal_code
        };
      });

      this.ordersProducts = this.orders.map(item => item.order);
      this.ordersTotals = this.orders.map(item => item.orderTotal);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
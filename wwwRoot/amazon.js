// Nous créons une application
const app = Vue.createApp({
    data: function () {
        return {
            productList: []
        }
    },
    created: async function () {
        console.log("created");
        await this.loadProducts();
    },
    methods: {
        loadProducts: async function () {
            let res = await fetch('/api/product/list');
            this.productList = await res.json();
        }
    }
})

let cartProducts = [];

app.component('amazon-product', {
    props: {
        image: String,
        name: String,
        description: String,
        price: Number,
        type: String,
        product: Object
    },
    methods: {
        formatCurrency: function (value) {
            return Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            }).format(value);
        },
        addToCart: function(product) {
            let alreadyAdded = false;
            cartProducts.forEach(prod => {
                if(prod.id === product.id) {
                    alreadyAdded = true;
                    prod.quantite ++;
                }
            }) 
            if(alreadyAdded === false) {
                product.quantite = 1;
                cartProducts.push(product);
            }
            console.log(cartProducts);
        }
    },
    template: ` <div class="amazon-product">
                    <img class="product-image" v-bind:src="image"/>
                    <div class="product-title product-text-center"> {{ name }} </div>
                    <div class="product-description product-text-center"> {{ description }} </div>
                    <div class="product-footer">
                        <div class="product-price"> {{ formatCurrency(price) }}</div>
                        <button class="button button-right button-info" v-on:click="addToCart(product)">Ajouter au panier</button>
                    </div>
                </div>`
});

app.component('amazon-header', {
    props: {
        menulogo: String,
        cartlogo: String,
        numberOfItems: Number,
    },
    template: ` <div class="amazon-header">
                    <img class="product-menu-logo" v-bind:src="menulogo"/>
                    <img class="product-cart-logo" v-bind:src="cartlogo"/>
                </div>`
});

app.mount('#app');
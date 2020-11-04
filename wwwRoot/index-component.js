// Nous créons une application
const app = Vue.createApp({
    methods: {
        buttonClick: function() {
            console.log('test');
        }
    }
})
app.component('icon-button', {
    props: {
        title: String,
        icon: String,
        position: String,
        type: String
    },
    template: ` <button 
                    v-bind:title="title" v-bind:class="'icon-button icon-button-'+position+' icon-button-'+type">
                    <img v-bind:src="icon"/>
                    <content><slot></slot></content>
                </button>`
}).mount('#app')
Vue.component('button-add-contact', {
    data: function () {
        return {contactList};
    },
    template : `<button v-on:click="contactList.push({prenom:'Phyllis', nom:'Lapin'})"> Ajouter un contact </button>`
});

var vm = new Vue({ 
    el:document.getElementById('app'),
    data: {
        title: 'Liste de contacts',
        message: '',
        contactList: [],
        inputContact: {
            prenom: '',
            nom:''
        }
    },
    created: async function () {
        console.log("created");
        await this.loadContacts();
    },
    methods: {
        loadContacts: async function () {
            console.log("loadContacts");
            let res = await fetch('/api/contact/list');
            this.contactList = await res.json();
            console.log(this.contactList);
        },
        saveContacts: async function () {
            console.log("saveContacts");
            let res = await fetch('/api/contact/list', {
                method: 'PUT',
                body: JSON.stringify(this.contactList),
                headers: {'Content-Type':'application/json'}
            });
        },
        addToList: function() {
            console.log("addToList");
            this.message = '';
            if(!this.inputContact.prenom || !this.inputContact.nom) {
                this.message = 'Merci de saisir un prénom et un nom';
                return;
            }
            let contactToAdd = {id:this.contactList.length, prenom:this.inputContact.prenom, nom:this.inputContact.nom};
            this.contactList.push(contactToAdd);

            //vider les inputs
            this.inputContact.prenom = '';
            this.inputContact.nom = '';
        },
        deleteContact: function(item) {
            console.log("deleteContact");
            let index = this.contactList.indexOf(item);
            this.contactList.splice(index, 1);
            for(let i=index;i<this.contactList.length;i++) {
                this.contactList[i].id = this.contactList[i].id - 1;
            }
        }
    }
});
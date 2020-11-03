const express = require('express');
const { read } = require('fs');
const app = express()
const port = 3000

let contactList = [
    { id:0, prenom:'Michaël', nom:'Lebreton' },
    { id:1, prenom:'Pierre', nom:'Affeux' },
    { id:2, prenom:'Jean', nom:'Nemard' }
];

// La ligne suivante permet de déclarer la racine du site Web.
// Tous les fichiers dans 'wwwRoot' sont considérés commes static/public.
// Cela permet la protection des fichiers à la recine du dossier.
app.use(express.json());
app.use(express.static('wwwRoot'));

//AIP contact
app.get('/api/contact/list', function(req, res) {
    res.json(contactList);
    res.end();
});

app.put('/api/contact/list', async function(req, res) {
    newContactList = req.body; 
    contactList = newContactList;
    
    /*for(contact of newContactList) {
        if(!contactList.includes(contact)) {
            console.log(contactList);
            console.log(contact);
            contactList.push(contact);
        }
    }*/

    res.end();
});

// Le serveur démarre
app.listen(port, () => console.log(`App listening on port port!`))
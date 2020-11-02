const express = require('express')
const app = express()
const port = 3000

// La ligne suivante permet de déclarer la racine du site Web.
// Tous les fichiers dans 'wwwRoot' sont considérés commes static/public.
// Cela permet la protection des fichiers à la recine du dossier.
app.use(express.static('wwwRoot'));

// Le serveur démare
app.listen(port, () => console.log(`App listening on port port!`))
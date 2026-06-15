const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://swapi.info/api/people/1');
    const character = await response.json();

    res.send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Mon personnage préféré</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <h1>Mon personnage préféré</h1>
        <p>Nom : ${character.name}</p>
        <p>Année de naissance : ${character.birth_year}</p>
        <p>Poids : ${character.mass} kg</p>
        <p>Taille : ${character.height} cm</p>
        <p><a href="/about?name=Flora">À propos de ce site</a></p>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Impossible de récupérer le personnage');
  }
});

app.get('/about', (req, res) => {
  const name = req.query.name || 'visiteur';
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>À propos</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <h1>À propos</h1>
      <p>Bonjour ${name} !</p>
      <p>Ce site a un seul et unique but : afficher mon personnage préféré
         de l'univers Star Wars.</p>
      <p>Sur la page d'accueil, vous y trouverez son nom, son année de
         naissance, son poids et sa taille. Toutes ces informations sont
         récupérées en direct depuis SWAPI, une API publique et gratuite
         qui recense les données de la saga.</p>
      <p><a href="/">Retour à l'accueil</a></p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
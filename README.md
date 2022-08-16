
NodeJs / Express / MongoDB /React/ Redux / Sass

INSTALATION

Back-end :
Mettez vos informations de cluster dans /config/db.js
Créez le fichier .env dans /config/ ajouter les donner suivante :
- PORT= votre port localhost pour votre Back-end(exemple 5000)
- PORT_FRONT = votre port localhost pour votre Front-end (exemple 3000)
- CLIENT_URL=http://localhost:3000 votre URL Front-end
- DB_USER_PASS= votre identifiant et mot de passe mongoDB
- TOKEN_SECRET=990bf68e6adf1be5f1671bba3bec692056922454 votre clé secrète aléatoire

Créer un dossier uploads pour les images

Front-end :
Créez un fichier .env :
- REACT_APP_API_URL=http://localhost:5000/ l'url de Back-end

DEMARRAGE:

Démarrage première utilisation :
Le Back-end : 
cd Back-end
npm install 
une fois les installations finies faire npm start

Le Front-end : 
cd Front-end 
npm install 
une fois les installations finies faire npm start


Démarrage toutes les utilisations suivantes :

Le Back-end : 
cd Back-end 
npm start

Le Front-end : 
cd Front-end 
npm start


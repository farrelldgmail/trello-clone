# Projet à des fin de formation sur les technologies utilisées par Bewave

Le projet utilise

1. Vuejs 2 : https://v2.vuejs.org/
2. Vuex 3 : https://v3.vuex.vuejs.org
3. Featherjs 4 : https://crow.docs.feathersjs.com/
4. Feather-vuex 3 : https://vuex.feathersjs.com/api-overview.html#features
5. Vuetify 2 : https://v2.vuetifyjs.com/en/

# Installation

1. Prérequis
   1. Avoir Nodejs 14
   2. Utiliser NVM pour gérer plusieurs version de node si on n’utilise pas Docker
   3. Documentation pour ubuntu : https://www.javatpoint.com/install-nvm-ubuntu
   4. Avoir yarn d'installé
2. Cloner le projet
   1. Le projet contient 2 projets, ce sont deux projets indépendants : Backend et frontend
3. Aller dans backend
4. yarn install
5. Démarrer la base de données
   1. Moteur : Mongodb
   2. Commande pour docker : docker run -p 27017:27017 --rm --name trello-clone-mongodb -v ~/path/to/data/data:/data/db mongo:latest
6. yarn dev
7. Aller dans frontend
8. yarn install
9. yarn serve

# Notes
yarn dev (yarn start ne fonctionne pas)

Nous avons des projets qui utilisent ces technologies, mais il est important de savoir  :
Vue 2 est en fin de vie au 31 décembre 2023 .
Vuex est remplacé par Pinia


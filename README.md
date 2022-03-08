[![Run Tests](https://github.com/kristiania-pg6301-2022/pg6301-innlevering-ChristofferEastcastle/actions/workflows/test.yml/badge.svg)](https://github.com/kristiania-pg6301-2022/pg6301-innlevering-ChristofferEastcastle/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/kristiania-pg6301-2022/pg6301-innlevering-ChristofferEastcastle/badge.svg?branch=main)](https://coveralls.io/github/kristiania-pg6301-2022/pg6301-innlevering-ChristofferEastcastle?branch=main)

Heroku Deploy: https://react-express-heroku.herokuapp.com/

Applikasjonen skal vise at dere behersker:

* Parcel
* React
* React Router
* Jest
* Github Actions
* Coveralls
* Express
* Heroku

# Oppsummert:

* [x] Få en Parcel til å bygge en React applikasjon
* [x] Få React Router til å navigere rundt i applikasjonen
* [x] Få React til å hente og lagre informasjon til et API
* [x] Få Github Actions til å kjøre Jest-testene og publisere coverage til Coveralls
* [x] Få Heroku til å publisere websidene
  Express-server skal ha følgende API:

GET /api/question - returnerer et tilfeldig spørsmål med { id, category, question, answers }
POST /api/question - tar inn { id, answer } og returnerer "true" eller "false"

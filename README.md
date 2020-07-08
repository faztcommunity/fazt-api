# fazt api

![Continuous Integration](https://github.com/faztdevelopers/fazt-api/workflows/Continuous%20Integration/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=code_smells)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=ncloc)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=sqale_index)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=bugs)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=coverage)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=hulkike_fazt-api&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=hulkike_fazt-api)
# scripts
```bash
npm run dev
```
```bash
npm start
```
```bash
npm run build
```

# endpoints

* `/projects`, lista los proyectos actuales de Fazt community.
* `/users`, lista los usuarios, administradores y colaboradores.
    * `gravatarURL`, la url de gravatar
    * nickname (Required)
    * password (Required)
    * email (Required)
    * firstName (optional)
    * lastName (optional)
    * createdAt (auto generate)

* `/tasks`, lista las tareas del proyecto.
* `/discord`, tareas administrativas de Discord.
* `/workshop`, lista de talleres de la comunidad.
* `/job`, ofertas de empleos.
* `/suggestion` 
* `/news` 
* `/misc` Enlaces de interés.
* `/github`, para listar los repos de la comunidad

# Environment Variables
* PORT, this is the default http port, by default is `3000`
* MONGODB_URI, this is the mongodb URI for connection. By default is `mongodb://localhost/faztapi`

# Docker
to run with docker compose
```bash
docker-compose up
```

# Contributors
* fazt [About me](https://github.com/fazttech) 
* nfortiz (elfer in Discord) [About me](https://github.com/nfortiz) 
* LordBeor [About me](https://github.com/Beor18)
* Fede [About me](https://github.com/Fedeya)
* Nova [About me](https://github.com/Michelyp)
* MatteoZL [About me](https://github.com/MatteoZL)
* Lea (Lea.js in Discord) [About me](https://github.com/venezia-dev)
* CejasClaudio [About me](https://github.com/CejasClaudioA)
* Paolinsky (Paolo Torregroza) [About me](https://github.com/PaoloTorregroza)

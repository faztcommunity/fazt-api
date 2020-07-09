# fazt api

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
to run with docker compose, create file .env with MONGODB_URI
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

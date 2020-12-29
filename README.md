# kanon-gaming-node-api

  As specified:
  
  - express
  - bcrypt
  - jsonwebtoken
  - sequelize
  - mysql
  - eslint
    
  Endpoints
  
  - GET -> /country/find/:countryName
  - GET -> /country/findAll
  - POST -> /country/findMany | Body: {countryNames: Array<string>}
  - POST -> /auth/register | Body: {name, email, password}
  - POST -> /auth/login | Body: {email, password}
  - POST -> /slotMachine/spin

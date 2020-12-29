# kanon-gaming-node-api

  As specified:
  
  - express
  - bcrypt
  - jsonwebtoken
  - sequelize
  - mysql
  - eslint
    
  Endpoints
  
  - Country -> GET /country/find/:countryName
  - All Countries -> GET /country/findAll
  - Countries -> POST /country/findMany | Body: {countryNames: Array<string>}
  - Register -> POST /auth/register | Body: {name, email, password}
  - Login -> POST /auth/login | Body: {email, password}
  - Slot machine -> POST /slotMachine/spin

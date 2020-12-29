# kanon-gaming-node-api

  - express
  - bcrypt
  - jsonwebtoken
  - sequelize
  - mysql
  
  - Country -> GET /country/find/:countryName
  - Countries -> POST /country/findMany/ | Body: {countryNames: Array<string>}
  - Register -> POST /auth/register | Body: {name, email, password}
  - Login -> POST /auth/login | Body: {email, password}
  - Slot machine -> POST /slotMachine/spin

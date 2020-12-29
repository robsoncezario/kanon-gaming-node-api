const app = require("./app");
require("./database");

app.listen(4000, () => {
  console.log("Server listening at port: 4000");
});

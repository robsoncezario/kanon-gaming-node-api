const app = require("./app");
require("./database");

app.listen(3000, () => {
  console.log("Server listening at door: 3000");
});

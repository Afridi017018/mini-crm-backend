require('dotenv').config();

const databaseExists = require("./src/createDatabase");
const initDb = require("./src/initDb");
const app = require('./src/app');





databaseExists()
  .then(() => initDb())
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Error starting server:", err.message);
    process.exit(1);
  });
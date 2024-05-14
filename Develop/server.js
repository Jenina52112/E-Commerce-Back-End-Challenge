const express = require('express');
const routes = require('./routes');

// import sequelize connection
const sequelize = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  // Once synced, start the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
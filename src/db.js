const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.NODE_ENV
  ? process.env.NODE_ENV === "testing"
    ? "testing"
    : "development"
  : "development";

const db = knex(config[environment]);

module.exports = db;

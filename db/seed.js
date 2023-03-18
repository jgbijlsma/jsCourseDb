const { Client } = require("pg");
const fs = require("fs");

const pgClient = new Client(
  "postgres://jscoursedb_user:YixPJokonSDuXqjbd6XDfCGS27DLGaqC@dpg-cgavr49mbg55nqkev1d0-a.frankfurt-postgres.render.com/jscoursedb?ssl=true"
);

seed();

async function seed() {
  try {
    await pgClient.connect();

    const seedQuery = fs.readFileSync(__dirname + "/seed.sql").toString();

    await pgClient.query(seedQuery);

    console.log("Seeding completed");

    pgClient.end();
  } catch (error) {
    console.log("Failed seeding the DB");
    console.error(error);
  }
}

const { connect } = require("mongoose");

async function mongoConnect() {
  try {
    connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("Erro na conexão com o Mongo:" + error);
  }
}

module.exports = mongoConnect;

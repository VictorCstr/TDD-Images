import { connect } from "mongoose";

export const mongoConnect = async () => {
  try {
    connect(process.env.MONGO_URL);
    console.log("Tudo certo com a conexão ao mongo");
  } catch (error) {
    console.log("Erro na conexão com o Mongo:" + error);
  }
};

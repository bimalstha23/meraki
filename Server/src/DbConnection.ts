import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres', 'bimal', 'bimal23//', {
    host: 'localhost',
    dialect: "postgres"
  });



export default sequelize;
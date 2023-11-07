import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.dbname as string, process.env.dbuser  as string, process.env.dbpassword as string, {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize


import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      age: Sequelize.INTEGER,
    }, { sequelize, modelName: 'tb_students' });
    return this;
  }
}

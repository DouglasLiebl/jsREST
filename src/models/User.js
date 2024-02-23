import Sequelize, { Model } from 'sequelize';
import brcypt from 'bcryptjs';
import bcrypt from 'bcryptjs/dist/bcrypt';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo nome de usuário deve ter entre 3 e 255 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email inválido.',
          },
        },
        unique: {
          msg: 'Email já existente.',
        },
      },
      hash_password: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 50],
            msg: 'A senha deve ter entre 8 e 50 caracteres.',
          },
        },
      },
    }, { sequelize, modelName: 'tb_users' });

    this.addHook('beforeSave', async (user) => {
      if (user.password) user.hash_password = await brcypt.hash(user.password, 8);
    });

    return this;
  }

  isValidPassword(password) {
    return bcrypt.compare(password, this.hash_password);
  }
}

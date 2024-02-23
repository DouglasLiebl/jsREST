import User from '../models/User';
import StandardError from '../exceptions/StandardError';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);

      return res.json(newUser);
    } catch (error) {
      return res.status(400).json(
        new StandardError(400, req.method, req.path, error.errors.map((e) => e.message)),
      );
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (error) {
      return res.status(200).json(
        new StandardError(200, req.method, req.path, error.errors.map((e) => e.message)),
      );
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (user === null) throw new Error(`Usuário não encontrado com o id: ${id}`);

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(404).json(
        new StandardError(404, req.method, req.path, [error.message]),
      );
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (id === null) throw new Error('O id do usuário a ser atualizado deve ser fornecido.');

      const user = await User.findByPk(id);
      if (user === null) throw new Error(`Usuário não encontrado com o id: ${id}`);

      const updatedUser = await user.update(req.body);
      return res.json(updatedUser);
    } catch (error) {
      return res.status(400).json(
        new StandardError(400, req.method, req.path, [error.message]),
      );
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (id === null) throw new Error('O id do usuário a ser atualizado deve ser fornecido.');

      const user = await User.findByPk(id);
      if (user === null) throw new Error(`Usuário não encontrado com o id: ${id}`);

      await user.destroy();
      return res.status(200).json({
        status: 'ok',
      });
    } catch (error) {
      return res.status(400).json(
        new StandardError(400, req.method, req.path, [error.message]),
      );
    }
  }
}

export default new UserController();

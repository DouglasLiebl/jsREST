import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create({
        username: 'James da Salada de Fruta',
        email: 'email@email.com',
        password: 'salada123',
      });

      res.json(newUser);
    } catch (error) {
      res.status(400).json(error.error.map((e) => e.message));
    }
  }
}

export default new UserController();

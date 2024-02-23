import jwt from 'jsonwebtoken';
import User from '../models/User';
import StandardError from '../exceptions/StandardError';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) throw new Error('Credenciais inválidas.');

      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('Usuário não existente.');

      if (!(await user.isValidPassword(password))) throw new Error('Senha inválida.');

      const token = jwt.sign({ id: user.id, email }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });

      return res.json({ token });
    } catch (error) {
      return res.status(400).json(
        new StandardError(400, req.method, req.path, [error.message]),
      );
    }
  }
}

export default new TokenController();

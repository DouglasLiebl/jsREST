import jwt from 'jsonwebtoken';
import StandardError from '../exceptions/StandardError';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json(new StandardError(401, req.method, req.path, ['You must be logged to access this resource.']));

  const [start, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({ where: { id, email } });

    if (!user) return res.status(401).json(new StandardError(401, req.method, req.path, ['Invalid User.']));

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json(
      new StandardError(401, req.method, req.path, ['Token expired or invalid.']),
    );
  }
};

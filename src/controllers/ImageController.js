import multer from 'multer';
import multerConfig from '../config/multer';
import StandardError from '../exceptions/StandardError';

const upload = multer(multerConfig).single('image');

class ImageController {
  async store(req, res) {
    return upload(req, res, (err) => {
      if (err) return res.status(400).json(new StandardError(400, req.method, req.path, err.errors.map((e) => e.message)));

      return res.json(req.file);
    });
  }
}

export default new ImageController();

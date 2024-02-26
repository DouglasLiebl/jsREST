import multer from 'multer';
import multerConfig from '../config/multer';
import StandardError from '../exceptions/StandardError';

import Image from '../models/Image';

const upload = multer(multerConfig).single('image');

class ImageController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json(new StandardError(400, req.method, req.path, err.errors.map((e) => e.message)));

      try {
        const { originalname, filename } = req.file;
        const image = await Image.create({ originalname, filename, student_id: req.body.student_id });

        return res.json(image);
      } catch (error) {
        return res.status(400).json(new StandardError(400, req.method, req.path, error.errors.map((e) => e.message)));
      }
    });
  }
}

export default new ImageController();

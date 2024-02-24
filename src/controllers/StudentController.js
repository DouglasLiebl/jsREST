import Student from '../models/Student';
import StandardError from '../exceptions/StandardError';

class StudentController {
  async create(req, res) {
    try {
      const student = await Student.create(req.body);

      return res.json(student);
    } catch (error) {
      return res.status(400).json(
        new StandardError(400, req.method, req.path, error.errors.map((e) => e.message)),
      );
    }
  }

  async index(req, res) {
    try {
      const students = await Student.findAll();

      return res.json(students);
    } catch (error) {
      return res.status(200).json(
        new StandardError(200, req.method, req.path, error.errors.map((e) => e.message)),
      );
    }
  }

  async show(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (student === null) throw new Error(`Estudante não encontrado com o id: ${req.params.id}`);

      return res.json(student);
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
      if (id === null) throw new Error('O id do estudante a ser atualizado deve ser fornecido.');

      const student = await Student.findByPk(id);
      if (student === null) throw new Error(`Estudante não encontrado com o id: ${id}`);

      const updatedStudent = await student.update(req.body);
      return res.json(updatedStudent);
    } catch (error) {
      return res.status(400).json(
        new StandardError(400, req.method, req.path, [error.message]),
      );
    }
  }

  async delete(req, res) {
    try {
      const student = await Student.findByPk(req.userId);
      if (student === null) throw new Error(`Estudante não encontrado com o id: ${req.userId}`);

      await student.destroy();
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

export default new StudentController();

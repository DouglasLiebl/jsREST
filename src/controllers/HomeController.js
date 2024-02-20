import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      first_name: 'James',
      last_name: 'Bond',
      email: 'james@email.com',
      age: 43,
    });

    res.json({
      newStudent,
    });
  }
}

export default new HomeController();

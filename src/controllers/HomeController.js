class HomeController {
  index(req, res) {
    res.json({
      'Hi There': true,
    });
  }
}

export default new HomeController();

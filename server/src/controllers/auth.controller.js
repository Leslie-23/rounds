const authService = require('../services/auth.service');

async function signup(req, res) {
  const result = await authService.signup(req.body);
  res.status(201).json(result);
}

async function login(req, res) {
  const result = await authService.login(req.body);
  res.json(result);
}

module.exports = { signup, login };

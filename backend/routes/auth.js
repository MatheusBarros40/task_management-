const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ id: user.id }, 'secreta123', { expiresIn: '1h' });

    res.json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

module.exports = router;

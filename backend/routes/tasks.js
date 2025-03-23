const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); 

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar tarefas' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID recebido:', req.params.id);
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json(task);
    console.log(`[${new Date().toISOString()}] Buscando tarefa com ID: ${id}`);
  } catch (error) {
    console.log(`[${new Date().toISOString()}] Buscando tarefa com ID: ${id}`);
    res.status(500).json({ error: 'Erro ao buscar a tarefa' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar tarefa' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await task.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});


router.patch('/:id/complete', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    task.status = 'Concluído';
    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

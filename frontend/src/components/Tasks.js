import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

    // Filtra as tarefas de acordo com o status selecionado
    const filteredTasks = tasks.filter(task => {
      if (filter === 'all') return true;
      return task.status === filter;
    });
  
    // Função para formatar a data (createdAt)
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert('Erro ao excluir tarefa');
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.patch(`/tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      alert('Erro ao marcar tarefa como concluída');
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
        <Link to="/create" className="bg-green-700 text-slate-100 hover:bg-green-900 px-4 py-2 rounded">
          Criar Tarefa
        </Link>
      </div>

      {/* Filtro de tarefas */}
      <div className="mb-4">
        <span className="mr-2">Filtrar:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">Todas</option>
          <option value="Pendente">Pendentes</option>
          <option value="Concluído">Concluídas</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className="p-4 border rounded mb-2 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm">Status: {task.status}</p>
              <p className="text-sm">
                Criada em: {formatDate(task.createdAt)}
              </p>
            </div>
            <div className="flex space-x-2">
            <Link
                to={`/edit/${task.id}`}
                className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded"
              >
                Editar
              </Link>
              <button
                onClick={() => handleComplete(task.id)}
                className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded"
              >
                Concluir
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 text-white hover:bg-red-800 px-3 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

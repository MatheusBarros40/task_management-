import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/tasks', { title, description });
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar tarefa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Criar Tarefa</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Título"
          className="p-2 border rounded mb-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          className="p-2 border rounded mb-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="p-2 bg-green-500 hover:bg-green-700 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Criar Tarefa'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;

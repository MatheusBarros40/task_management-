import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Busca os dados da tarefa para edição
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/tasks/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        setError(err.response?.data?.error || 'Erro ao carregar tarefa');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Enviando:', { title, description });

      await api.put(`/tasks/${id}`, { title, description });
      navigate('/tasks');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
      err.message || 
      'Erro desconhecido';
setError(`Erro: ${errorMessage}`);
console.error('Detalhes do erro:', err.response || err);    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Editar Tarefa</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Título"
          className="p-2 border rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          className="p-2 border rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
};

export default EditTask;

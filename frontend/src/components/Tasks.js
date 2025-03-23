import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries';
import { DELETE_TASK } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Tasks = () => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { page },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask: deletedTask } }) {
      const existing = cache.readQuery({
        query: GET_TASKS,
        variables: { page },
      });

      if (existing?.tasks) {
        cache.writeQuery({
          query: GET_TASKS,
          variables: { page },
          data: {
            tasks: {
              ...existing.tasks,
              tasks: existing.tasks.tasks.filter((task) => task.id !== deletedTask.id),
            },
          },
        });
      }
    },
    onCompleted: () => {
      toast.success('Tarefa excluída com sucesso!');
      refetch(); // Força a atualização da lista de tarefas
    },
    onError: () => toast.error('Erro ao excluir tarefa!'),
  });

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteTask({ variables: { id } });
    } catch (err) {
      toast.error('Erro ao excluir tarefa!');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.patch(`/tasks/${id}/complete`);
      toast.success('Tarefa marcada como concluída!');
      refetch();
    } catch (err) {
      toast.error('Erro ao marcar tarefa como concluída');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString();
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  const filteredTasks = data.tasks.tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
        <Link
          to="/create"
          className="bg-green-700 text-slate-100 hover:bg-green-900 px-4 py-2 rounded"
        >
          Criar Tarefa
        </Link>
      </div>

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

      <ul data-cy="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="p-4 border rounded mb-2 flex justify-between items-center"
          >
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
                disabled={isDeleting}
                className="bg-red-600 text-white hover:bg-red-800 px-3 py-1 rounded disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Tasks;
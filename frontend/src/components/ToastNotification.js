import { useEffect } from 'react'; 
import socket from '../services/rabbitmqSocket';
import { toast } from 'react-toastify';

const ToastNotification = () => {
  useEffect(() => {
    const handleTaskDeleted = (data) => {
      toast.warn(`⚠️ A tarefa #${data.taskId} foi removida automaticamente!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    };

    socket.on('task_deleted', handleTaskDeleted);

    return () => {
      socket.off('task_deleted', handleTaskDeleted);
    };
  }, []); 
  return null;
};

export default ToastNotification;
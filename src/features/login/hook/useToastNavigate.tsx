import { toast, ToastOptions } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function useToastNavigate() {
  const navigate = useNavigate();

  const toastAndGo = (ok: boolean, message: string, path: string, options?: ToastOptions) => {
    if (ok)
      toast.success(message, {
        ...options,
        onClose: () => navigate(path),
      });
    else
      toast.error(message, {
        ...options,
        onClose: () => navigate(path),
      });
  };

  return { toastAndGo };
}

export default useToastNavigate;

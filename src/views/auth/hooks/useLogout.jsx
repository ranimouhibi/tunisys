import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // Initialiser navigate

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');

    // Dispatch logout action
    dispatch({ type: 'LOGOUT' });

    // Redirection vers la page d'authentification
    navigate('/auth/sign-in'); // Rediriger vers la page d'authentification
  };

  return { logout };
};

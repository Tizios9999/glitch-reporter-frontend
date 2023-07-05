import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [ state ] = useContext(AuthContext);

  useEffect(() => {
    if (!state.isLoggedIn) {
      router.push('/login'); // Reindirizza l'utente alla pagina di accesso se non è autenticato
    }
  }, [router, state.isLoggedIn]);

  if (!state.isLoggedIn) {
    return null; // Renderizza null se l'utente non è autenticato, potresti anche mostrare un messaggio di accesso negato
  }

  return <>{children}</>; // Renderizza il contenuto se l'utente è autenticato
};

export default ProtectedRoute;
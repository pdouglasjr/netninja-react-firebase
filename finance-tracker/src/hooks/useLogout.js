import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  // states
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState('');
  // dispatch
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
      if (!isCancelled) {
        // logout successful, reset error and pending states
        setIsPending(false);
        setError(null);
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err);
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending }
}
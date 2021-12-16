import { projectAuth } from '../firebase/config';

// React hooks
import { useEffect, useState } from 'react';

// Custom hooks
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  // states
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);

  // dispatch
  const { dispatch } = useAuthContext();

  // functions
  const signup = async (email, password, displayName) => {
    setError(null);   // reset error state every signup
    setIsPending(true);

    try {
      // signup user with email and password
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);

      // if signup fails throw an error
      if (!res) {
        throw new Error('Could not complete signup');
      }

      // add display name to user account
      await res.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // 
      if (!isCancelled) { 
        setIsPending(false);
        setError(null);
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);  
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])

  return { error, isPending, signup }
}
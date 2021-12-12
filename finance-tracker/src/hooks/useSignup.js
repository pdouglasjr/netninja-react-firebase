import { projectAuth } from '../firebase/config';

// React hooks
import { useState } from 'react';

// Custom hooks
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  // states
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

      // if signup fails
      if (!res) {
        throw new Error('Could not complete signup');
      }

      // add display name to user account
      await res.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      setIsPending(false);
      setError(null);
    }
    catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);  
    }
  }

  return { error, isPending, signup }
}
// React components
import { createContext, useEffect, useReducer } from "react";

// Firestore Auth
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

// perform state update depending on the type of action being performed.
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    /* initial state: user is not logged in */
    user: null, 
    authIsReady: false
  });

  /* 
    useEffect can be used when you want to run something
    only once when the component is evaluated
  */
  useEffect(() => {
    // ask Firebase whether there is a user logged in
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unsub(); // unsubscribe
    });
  }, []);

  // console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}
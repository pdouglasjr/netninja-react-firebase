// React hooks
import { useState } from 'react';

// Custom hooks
import { useSignup } from '../../hooks/useSignup';

// styles
import styles from './Signup.module.css';

export default function Signup() {
  // states
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // signup hook
  const { signup, isPending, error } = useSignup();

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  }

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>dispaly name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      { !isPending && <button className="btn">Signup</button> }
      { isPending && <button className="btn">loading</button> }
      { error && <p>{ error }</p> }
    </form>
  )
}

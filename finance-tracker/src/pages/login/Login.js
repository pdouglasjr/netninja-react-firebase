// React components
import { useState } from 'react';

// Custom hooks
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css';

export default function Login() {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isPending } = useLogin();

  // function
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form className={styles['login-form']} action="" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      { !isPending && <button className="btn" type="submit">Log In</button> }
      { isPending && <button className="btn">Logging in...</button> }
      { error && <p>{ error }</p> }
    </form>
  )
}

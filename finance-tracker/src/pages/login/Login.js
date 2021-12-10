// React components
import { useState } from 'react';

// styles
import styles from './Login.module.css';

export default function Login() {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
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
      <button className="btn" type="submit">Log In</button>
    </form>
  )
}

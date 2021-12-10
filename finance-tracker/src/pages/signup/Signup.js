// React components
import { useState } from 'react';

// styles
import styles from './Signup.module.css';

export default function Signup() {
  // states
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(displayName, email, password);
  }

  return (
    <form className="signup-form" action="" >
      <label>
        <span>dispaly name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </form>
  )
}

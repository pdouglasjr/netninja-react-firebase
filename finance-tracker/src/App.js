// routing components
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// app components
import Navbar from './components/navigation/Navbar';

// hooks
import { useAuthContext } from './hooks/useAuthContext'

// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      { authIsReady && (  /* only render components when authIsReady = true */
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              { !user && <Redirect to="/login"/> }
              { user && <Home /> /* if user is logged in, redirect to homepage */ } 
            </Route>
            <Route path="/login">
              { !user && <Login /> }
              { user && <Redirect to="/"/> }
            </Route>
            <Route path="/signup">
              { !user && <Signup /> }
              { user && <Redirect to="/"/> }
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

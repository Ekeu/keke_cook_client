import { Switch, Route } from 'react-router-dom';

import Login from './pages/auth/login/login.pages.jsx';
import Register from './pages/auth/register/register.pages.jsx';
import Home from './pages/home/home.pages.jsx';

import Header from './components/header/header.component';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </>
  );
};

export default App;

import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase/firebase';

import { setCurrentUser } from './redux/reducers/user/user.actions';

import Login from './pages/auth/login/login.page.jsx';
import Register from './pages/auth/register/register.page.jsx';
import FinishRegistration from './pages/auth/finish-registration/finish-registration.page.jsx';
import Home from './pages/home/home.pages.jsx';
import ForgotPassword from './pages/auth/forgot-password/forgot-password.page.jsx'

import Header from './components/header/header.component';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(
          setCurrentUser({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            token: idTokenResult.token,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer
        hideProgressBar
        closeButton={false}
        style={{ width: '25rem', padding: '0px' }}
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/finish' component={FinishRegistration} />
        <Route exact path='/password/new' component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App;

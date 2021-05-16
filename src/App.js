import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase/firebase';

import { getCurrentUser } from './redux/reducers/user/user.actions';

import Login from './pages/auth/login/login.page.jsx';
import Register from './pages/auth/register/register.page.jsx';
import FinishRegistration from './pages/auth/finish-registration/finish-registration.page.jsx';
import Home from './pages/home/home.pages.jsx';
import ForgotPassword from './pages/auth/forgot-password/forgot-password.page.jsx';
import History from './pages/user/history.page.jsx';
import Password from './pages/user/password.page.jsx';
import WishList from './pages/user/wish-list.page.jsx';
import AdminDashboard from './pages/admin/dashboard.page.jsx';
import Category from './pages/admin/category/category.page.jsx';
import Subcategory from './pages/admin/subcategory/subcategory.page.jsx';


import Header from './components/header/header.component';

import UserRoute from './components/private-routes/user-routes.component'
import AdminRoute from './components/private-routes/admin-routes.component'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(getCurrentUser(idTokenResult.token));
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
        <UserRoute exact path='/me/account' component={History} />
        <UserRoute exact path='/me/password/update' component={Password} />
        <UserRoute exact path='/me/wishlist' component={WishList} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/products/categories' component={Category} />
        <AdminRoute exact path='/admin/products/subcategories' component={Subcategory} />
      </Switch>
    </>
  );
};

export default App;

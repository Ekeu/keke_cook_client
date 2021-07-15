import { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase/firebase';

import { getCurrentUser } from './redux/reducers/user/user.actions';

import LoaderV2 from './components/loader/loader-v2.component.jsx';

const Login = lazy(() => import('./pages/auth/login/login.page.jsx'));
const Register = lazy(() => import('./pages/auth/register/register.page.jsx'));
const FinishRegistration = lazy(() =>
  import('./pages/auth/finish-registration/finish-registration.page.jsx')
);
const Home = lazy(() => import('./pages/home/home.pages.jsx'));
const ForgotPassword = lazy(() =>
  import('./pages/auth/forgot-password/forgot-password.page.jsx')
);
const History = lazy(() => import('./pages/user/history.page.jsx'));
const Password = lazy(() => import('./pages/user/password.page.jsx'));
const WishList = lazy(() => import('./pages/user/wish-list.page.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/dashboard.page.jsx'));
const AdminCategory = lazy(() =>
  import('./pages/admin/category/category.page.jsx')
);
const AdminSubcategory = lazy(() =>
  import('./pages/admin/subcategory/subcategory.page.jsx')
);
const AdminProduct = lazy(() =>
  import('./pages/admin/product/product.page.jsx')
);
const Coupon = lazy(() => import('./pages/admin/coupon/coupon.page.jsx'));
const Product = lazy(() => import('./pages/product/product.page.jsx'));
const Category = lazy(() => import('./pages/category/category.page.jsx'));
const Subcategory = lazy(() =>
  import('./pages/subcategory/subcategory.page.jsx')
);
const ProductUpdate = lazy(() =>
  import('./pages/admin/product-update/product-update.page.jsx')
);
const AdminProducts = lazy(() =>
  import('./pages/admin/products/products.page.jsx')
);
const Products = lazy(() => import('./pages/products/products.page'));
const Cart = lazy(() => import('./pages/cart/cart.page'));
const Checkout = lazy(() => import('./pages/checkout/checkout.page'));
const Payment = lazy(() => import('./pages/payment/payment.page'));

const Header = lazy(() => import('./components/header/header.component'));
const UserRoute = lazy(() =>
  import('./components/private-routes/user-routes.component')
);
const AdminRoute = lazy(() =>
  import('./components/private-routes/admin-routes.component')
);
const Footer = lazy(() => import('./components/footer/footer.component.jsx'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);
        dispatch(getCurrentUser(idTokenResult.token));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={<LoaderV2 size={'h-12 w-12'} color={'text-rose-500'} />}>
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
        <Route exact path='/products' component={Products} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/categories/:slug' component={Category} />
        <Route exact path='/scategories/:slug' component={Subcategory} />
        <UserRoute exact path='/me/delivery' component={Checkout} />
        <UserRoute exact path='/me/payment' component={Payment} />
        <UserRoute exact path='/me/account' component={History} />
        <UserRoute exact path='/me/password/update' component={Password} />
        <UserRoute exact path='/me/wishlist' component={WishList} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/products' component={AdminProducts} />
        <AdminRoute exact path='/admin/products/coupons' component={Coupon} />
        <AdminRoute
          exact
          path='/admin/products/:slug/edit'
          component={ProductUpdate}
        />
        <AdminRoute
          exact
          path='/admin/products/categories'
          component={AdminCategory}
        />
        <AdminRoute
          exact
          path='/admin/products/subcategories'
          component={AdminSubcategory}
        />
        <AdminRoute exact path='/admin/products/add' component={AdminProduct} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default App;

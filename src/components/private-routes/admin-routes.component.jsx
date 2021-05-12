import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import LoadRedirect from '../private-routes/load-redirect.component';

const AdminRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isAdmin, setIsAdmin] = useState(false);

  const getAdminUser = async (token) => {
    return await axios.get('/api/v1/auth/admin', {
      headers: {
        Authorization: token,
      },
    });
  };

  useEffect(() => {
    if (userInfo?.token) {
      getAdminUser(userInfo.token)
        .then((res) => {
          console.log(res);
          setIsAdmin(true);
        })
        .catch((error) => {
          console.log(error);
          setIsAdmin(false);
        });
    }
  }, [userInfo]);

  return isAdmin ? <Route {...rest} /> : <LoadRedirect />;
};

export default AdminRoute;

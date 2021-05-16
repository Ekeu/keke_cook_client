import React from 'react';

import UserNav from '../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../components/nav/user.nav.children.layout.component';

import {
    ADMIN_NAVIGATION_COLORS,
    ADMIN_NAVIGATION,
} from '../../constants/admin.menu.constants';

const AdminDashboard = () => {
  return (
    <>
      <UserNav
        navigation={ADMIN_NAVIGATION}
        navigationColors={ADMIN_NAVIGATION_COLORS}
      >
        <UserNavChildrenLayout headline={'Dashboard'}></UserNavChildrenLayout>
      </UserNav>
    </>
  );
};

export default AdminDashboard;

import React from 'react';

import UserNav from '../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../components/nav/user.nav.children.layout.component'

const WishList = () => {
  return (
    <>
      <UserNav>
        <UserNavChildrenLayout headline={'Liste de souhaits'}>

        </UserNavChildrenLayout>
      </UserNav>
    </>
  );
};

export default WishList;

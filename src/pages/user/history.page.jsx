import React from 'react';

import UserNav from '../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../components/nav/user.nav.children.layout.component'

const History = () => {
  return (
    <>
      <UserNav>
        <UserNavChildrenLayout headline={'Historique'}>

        </UserNavChildrenLayout>
      </UserNav>
    </>
  );
};

export default History;

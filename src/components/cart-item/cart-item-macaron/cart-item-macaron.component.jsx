import React from 'react';

import CartItemLabelValue from '../cart-item-label-value/cart-item-label-vaue.component';

const CartItemMacaron = ({ item }) => {
  return (
    <>
      <CartItemLabelValue label={'Nombre de part'} value={item?.share} />
      <CartItemLabelValue label={'Couleur coque'} value={item?.shellColor} />
      <CartItemLabelValue label={'Fourage'} value={item?.fodder} />
    </>
  );
};

export default CartItemMacaron;

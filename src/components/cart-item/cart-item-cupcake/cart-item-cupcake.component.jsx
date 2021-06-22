import React from 'react';

import CartItemLabelValue from '../cart-item-label-value/cart-item-label-vaue.component';
import CartItemToppings from '../cart-item-toppings/cart-item-toppings.component';

const CartItemCupcake = ({ item }) => {
  return (
    <>
      <CartItemLabelValue label={'Nombre de part'} value={item?.share} />
      <CartItemLabelValue label={'Cake'} value={item?.cake} />
      <CartItemLabelValue label={'Cake 2'} value={item?.cake2} />
      <CartItemLabelValue label={'Fourage'} value={item?.fodder} />
      <CartItemLabelValue label={'Fourage 2'} value={item?.fodder2} />
      <CartItemLabelValue label={'Couleur Crème'} value={item?.creamColor} />
      <CartItemLabelValue label={'Couleur Crème 2'} value={item?.creamColor2} />
      {item?.description && (
        <CartItemLabelValue
          gridCol={'sm:col-span-2'}
          label={'Description'}
          value={item?.description}
        />
      )}
      <CartItemToppings toppings={item?.toppings} label={'Toppings'} />
      <CartItemToppings toppings={item?.toppings2} label={'Toppings 2'} />
    </>
  );
};

export default CartItemCupcake;

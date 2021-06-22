import React from 'react';

import CartItemLabelValue from '../cart-item-label-value/cart-item-label-vaue.component';
import CartItemToppings from '../cart-item-toppings/cart-item-toppings.component';

const CartItemNumberLetterCake = ({ item }) => {
  return (
    <>
      <CartItemLabelValue label={'Nombre de part'} value={item?.share} />
      <CartItemLabelValue label={'Caractères'} value={item?.caracters} />
      <CartItemLabelValue label={'Biscuit'} value={item?.biscuit} />
      {item?.numberOfFlavors >= 2 && (
        <CartItemLabelValue label={'Biscuit 2'} value={item?.biscuit2} />
      )}
      <CartItemLabelValue label={'Crème'} value={item?.cream} />
      {item?.numberOfFlavors >= 2 && (
        <CartItemLabelValue label={'Crème 2'} value={item?.cream2} />
      )}
      <CartItemToppings label={'Toppings'} toppings={item?.toppings} />
      {item?.numberOfFlavors >= 2 && (
        <CartItemToppings label={'Toppings 2'} toppings={item?.toppings2} />
      )}
    </>
  );
};

export default CartItemNumberLetterCake;

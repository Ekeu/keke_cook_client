import React from 'react';

import CartItemToppings from '../cart-item-toppings/cart-item-toppings.component';

const CartItemBrownie = ({ item }) => {
  return (
    <>
      {item?.toppings.length > 0 && (
        <CartItemToppings toppings={item?.toppings} label={'Toppings'} />
      )}
    </>
  );
};

export default CartItemBrownie;

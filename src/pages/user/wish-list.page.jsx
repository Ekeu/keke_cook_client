import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getWishlist,
  removeProductFromWishlist,
} from '../../redux/reducers/user/user.actions';
import { REMOVE_PRODUCT_FROM_WISHLIST_RESET } from '../../redux/reducers/user/user.types';

import UserNav from '../../components/nav/user.nav.component';
import LoaderV2 from '../../components/loader/loader-v2.component.jsx';
import WishlistProductCard from '../../components/cards/wishlist-product-card.component';
import Notification from '../../components/notification/notification.component.jsx';
import UserNavChildrenLayout from '../../components/nav/user.nav.children.layout.component';

import {
  WISHLIST_HEADLINE,
  WISHLIST_DESCRIPTION,
} from '../../constants/admin.menu.constants';

const WishList = () => {
  const dispatch = useDispatch();

  const wishlistList = useSelector((state) => state.wishlistList);
  const { loading, wishlist, error } = wishlistList;
  const removeFromWishlist = useSelector((state) => state.removeFromWishlist);
  const {
    success,
    error: errorRemoveFromWishlist,
  } = removeFromWishlist;

  useEffect(() => {
    dispatch(getWishlist());
    if (success) {
      dispatch({ type: REMOVE_PRODUCT_FROM_WISHLIST_RESET });
    }
    if (error) {
      toast(
        <Notification error headline='Erreur'>
          Erreur de chargement - {error}
        </Notification>
      );
    }
    if (errorRemoveFromWishlist) {
      dispatch({ type: REMOVE_PRODUCT_FROM_WISHLIST_RESET });
      toast(
        <Notification error headline='Erreur'>
          Une erreur s'est produite. Veuillez réessayer! -{' '}
          {errorRemoveFromWishlist}
        </Notification>
      );
    }
  }, [dispatch, success, error, errorRemoveFromWishlist]);

  const handleRemove = (productId) => {
    dispatch(removeProductFromWishlist(productId));
  };

  return (
    <>
      <UserNav>
        <UserNavChildrenLayout
          headline={WISHLIST_HEADLINE}
          description={WISHLIST_DESCRIPTION}
        >
          <div className=''>
            <div className='max-w-7xl mx-auto py-12 text-center'>
              <div className='space-y-12'>
                {loading && <LoaderV2 size={'h-24 w-24'} color={'text-rose-500'} />}
                {wishlist?.wishlist?.length <= 0 ? (
                  <div className='space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl'>
                    <h2 className='text-3xl font-extrabold font-hind tracking-tight sm:text-4xl'>
                      Rien d'enregistré pour le moment
                    </h2>
                    <p className='text-xl font-hind text-blue-gray-500'>
                      Clique sur le coeur pour enregistrer des articles ici pour
                      plus tard
                    </p>
                  </div>
                ) : (
                  <ul className='space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl'>
                    {wishlist?.wishlist?.map((product) => (
                      <li key={product?.title}>
                        <WishlistProductCard
                          product={product}
                          onClick={() => handleRemove(product?._id)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </UserNavChildrenLayout>
      </UserNav>
    </>
  );
};

export default WishList;

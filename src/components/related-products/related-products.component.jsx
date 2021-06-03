import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Notification from '../notification/notification.component.jsx';
import HeadlineAndProducts from '../headline-and-products/headline-and-products.component.jsx';

import { listRelatedProducts } from '../../redux/reducers/product/product.actions';
import { PRODUCT_LIST_RELATED_RESET } from '../../redux/reducers/product/product.types';

const RelatedProducts = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const productListRelated = useSelector((state) => state.productListRelated);
  const { loading, error, products } = productListRelated;

  useEffect(() => {
    dispatch({ type: PRODUCT_LIST_RELATED_RESET });
    if (product?._id) {
      dispatch(listRelatedProducts(product._id));
    }
    if (error) {
      toast(
        <Notification error headline='Erreur de chargement'>
          {error}
        </Notification>
      );
    }
  }, [dispatch, error, product?._id]);
  return (
    <>
      {products?.length && (
        <HeadlineAndProducts
          tag='#related'
          headline='Vous aimerez peut-être aussi'
          showHeadline
          loading={loading}
          products={products}
        ></HeadlineAndProducts>
      )}
    </>
  );
};

export default RelatedProducts;

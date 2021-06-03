import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Notification from '../notification/notification.component.jsx';
import HeadlineAndProducts from '../headline-and-products/headline-and-products.component.jsx';

import { listSortSoldProducts } from '../../redux/reducers/product/product.actions';

const TopProducts = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  const productSortSold = useSelector((state) => state.productSortSold);
  const { loading, error, products, page, pages } = productSortSold;

  useEffect(() => {
    dispatch(listSortSoldProducts('desc', pageNumber));
    if (error) {
      toast(
        <Notification error headline='Erreur de chargement'>
          {error}
        </Notification>
      );
    }
  }, [dispatch, error, pageNumber]);
  return (
    <HeadlineAndProducts
      tag='#top'
      headline='Meilleures Ventes'
      loading={loading}
      products={products}
      pages={(pages / 3) * 2}
      page={page}
      showPagination
      showHeadline
      setPageNumber={setPageNumber}
    ></HeadlineAndProducts>
  );
};

export default TopProducts;

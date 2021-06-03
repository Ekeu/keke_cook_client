import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Notification from '../../components/notification/notification.component.jsx';
import HeadlineAndProducts from '../../components/headline-and-products/headline-and-products.component.jsx';

import {
  getSubcategory,
  getSubCategories,
} from '../../redux/reducers/subcategory/subcategory.actions';

import CatSubHero from '../../components/hero/cat-sub-hero.component.jsx';

const Subcategory = ({ match }) => {
  const [data, setData] = useState(null);

  const dispatch = useDispatch();

  const subcategoryDetails = useSelector((state) => state.subcategoryDetails);
  const { loading, error, products, subcategory } = subcategoryDetails;
  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { error: errorSubcategories, subcategories } = subcategoryList;

  useEffect(() => {
    dispatch(getSubcategory(match.params.slug));
    dispatch(getSubCategories());
  }, [match.params.slug, dispatch]);

  useEffect(() => {
    if (error) {
      toast(
        <Notification error headline='Erreur de chargement'>
          {error}
        </Notification>
      );
    }
    if (errorSubcategories) {
      toast(
        <Notification error headline='Erreur de chargement'>
          {errorSubcategories}
        </Notification>
      );
    }
  }, [error, errorSubcategories]);

  useEffect(() => {
    if (subcategories?.length > 0) {
      const result = subcategories.find(
        (sub) => sub.category === subcategory?.parentCategory?.name
      );
      setData(result);
    }
  }, [match.params.slug, subcategories, subcategory?.parentCategory?.name]);

  return (
    <>
      <CatSubHero
        data={data}
        sub={true}
        currentSubcategory={subcategory?.name}
      />
      <HeadlineAndProducts
        loading={loading}
        products={products}
      ></HeadlineAndProducts>
    </>
  );
};

export default Subcategory;

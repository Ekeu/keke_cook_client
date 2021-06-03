import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Notification from '../../components/notification/notification.component.jsx';
import HeadlineAndProducts from '../../components/headline-and-products/headline-and-products.component.jsx';

import { getCategory } from '../../redux/reducers/category/category.actions';
import { getSubCategories } from '../../redux/reducers/subcategory/subcategory.actions';

import CatSubHero from '../../components/hero/cat-sub-hero.component.jsx';

const Category = ({ match }) => {
  const [data, setData] = useState(null);

  const dispatch = useDispatch();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, products, category } = categoryDetails;
  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { error: errorSubcategories, subcategories } = subcategoryList;

  useEffect(() => {
    dispatch(getCategory(match.params.slug));
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
        (sub) => sub.category === category?.name
      );
      setData(result);
    }
  }, [match.params.slug, subcategories, category?.name]);

  return (
    <>
      <CatSubHero data={data} />
      <HeadlineAndProducts
        loading={loading}
        products={products}
      ></HeadlineAndProducts>
    </>
  );
};

export default Category;

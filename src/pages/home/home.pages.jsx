import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getCategories } from '../../redux/reducers/category/category.actions';

import Hero from '../../components/hero/hero.component.jsx';
import Cta from '../../components/cta/cta.component.jsx';
import Newsletter from '../../components/newsletter/newsletter.component.jsx';
import Notification from '../../components/notification/notification.component.jsx';
import Loader from '../../components/loader/loader.component';
import NewProducts from '../../components/new-products/new-products.component.jsx';
import TopProducts from '../../components/top-products/top-products.component.jsx';
import SectionHeadline from '../../components/section-headline/section-headline.component.jsx';
import ChooseCategory from '../../components/choose-category/choose-category.component.jsx';

const Home = () => {
  const dispatch = useDispatch();

  const publicIds = [
    'keke-cook/category-cake',
    'keke-cook/category-sweet-table',
  ];

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(getCategories());
    if (error) {
      toast(
        <Notification error headline='Erreur de chargement'>
          {error}
        </Notification>
      );
    }
  }, [dispatch, error]);

  return (
    <>
      <div className='lg:relative'>
        <Hero />
      </div>
      <NewProducts />
      <Cta />
      <TopProducts />
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <div className='space-y-12'>
            <div className='space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none'>
              <SectionHeadline
                tag={'#category'}
                headline={'Quelle catégorie vous convient?'}
              ></SectionHeadline>
            </div>
            {loading && (
              <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='py-8 px-4 flex justify-center sm:px-10'>
                  <Loader height='h-24' width='h-24' />
                </div>
              </div>
            )}
            {categories?.length > 0 && (
              <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8'>
                {categories.map((category, index) => (
                  <ChooseCategory
                    key={publicIds[index]}
                    public_id={publicIds[index]}
                    category={category?.name}
                    url={`/categories/${category?.slug}`}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default Home;

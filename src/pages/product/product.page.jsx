import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import MultiSelect from 'react-multi-select-component';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';

import { ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import Rating from '../../components/rating/rating.component';
import Loader from '../../components/loader/loader.component';
import ProductNoImage from '../../components/product-image/product-no-image.component';
import Select from '../../components/select/select.component';
import CustomButton from '../../components/custom-button/custom-button.component.jsx';
import SlideOver from '../../components/slide-over/slide-over.component.jsx';
import CupcakePage from '../../components/product-types/cupcake/cupcake-page.component';
import NumberLetterCakePage from '../../components/product-types/number-letter-cake/number-letter-cake-page.component';
import MacaronPage from '../../components/product-types/macaron/macaron-page.component';
import BrowniePage from '../../components/product-types/brownie/brownie-page.component';

import { listProductDetails } from '../../redux/reducers/product/product.actions';

import { currencyFormatter } from '../../utils/functions';

import { MULTISELECT_INTERNATIONALIZATION } from '../../constants/admin.product.constants';

import { ArrowRenderer, CustomClearIcon } from '../../utils/components';

const Product = ({ history, match }) => {
  const [convertedContent, setConvertedContent] = useState(null);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Product
  const [price, setPrice] = useState(1);

  //Slide Over
  const [openSlideOver, setOpenSlideOver] = useState(false);

  //Cupcake Component State
  const [cupcakeShares, setCupcakeShares] = useState([]);
  const [cupcakeShare, setCupcakeShare] = useState(null);
  const [cupcakeCakes, setCupcakeCakes] = useState([]);
  const [cupcakeCake, setCupcakeCake] = useState(null);
  const [cupcakeCake2, setCupcakeCake2] = useState(null);
  const [cupcakeFodders, setCupcakeFodders] = useState([]);
  const [cupcakeFodder, setCupcakeFodder] = useState(null);
  const [cupcakeFodder2, setCupcakeFodder2] = useState(null);
  const [cupcakeCreamColors, setCupcakeCreamColors] = useState([]);
  const [cupcakeCreamColor, setCupcakeCreamColor] = useState(null);
  const [cupcakeCreamColor2, setCupcakeCreamColor2] = useState(null);
  const [cupcakeToppings, setCupcakeToppings] = useState([]);
  const [cupcakeToppings2, setCupcakeToppings2] = useState([]);
  const [cupcakeSelectedToppings, setCupcakeSelectedToppings] = useState([]);
  const [cupcakeSelectedToppings2, setCupcakeSelectedToppings2] = useState([]);
  const [cupcakeDescription, setCupcakeDescription] = useState('');

  //Macaron Component State
  const [macaronShares, setMacaronShares] = useState([]);
  const [macaronShare, setMacaronShare] = useState(null);
  const [macaronShellColors, setMacaronShellColors] = useState([]);
  const [macaronShellColor, setMacaronShellColor] = useState(null);
  const [macaronFodders, setMacaronFodders] = useState([]);
  const [macaronFodder, setMacaronFodder] = useState(null);

  //Brownie Component State
  const [brownieToppings, setBrownieToppings] = useState([]);
  const [brownieSelectedToppings, setBrownieSelectedToppings] = useState([]);

  //Number/Letter Cake Component State
  const [numberLetterCakeShares, setNumberLetterCakeShares] = useState([]);
  const [numberLetterCakeShare, setNumberLetterCakeShare] = useState(null);
  const [numberLetterCakeBiscuits, setNumberLetterCakeBiscuits] = useState([]);
  const [numberLetterCakeBiscuit, setNumberLetterCakeBiscuit] = useState(null);
  const [numberLetterCakeBiscuit2, setNumberLetterCakeBiscuit2] =
    useState(null);
  const [numberLetterCakeCreams, setNumberLetterCakeCreams] = useState([]);
  const [numberLetterCakeCream, setNumberLetterCakeCream] = useState(null);
  const [numberLetterCakeCream2, setNumberLetterCakeCream2] = useState(null);
  const [numberLetterCakeToppings, setNumberLetterCakeToppings] = useState([]);
  const [numberLetterCakeToppings2, setNumberLetterCakeToppings2] = useState(
    []
  );
  const [
    numberLetterCakeSelectedToppings,
    setNumberLetterCakeSelectedToppings,
  ] = useState([]);
  const [
    numberLetterCakeSelectedToppings2,
    setNumberLetterCakeSelectedToppings2,
  ] = useState([]);
  const [numberLetterCakeCaracters, setNumberLetterCakeCaracters] =
    useState('');
  const [numberOfNumbersOrLetters, setNumberOfNumbersOrLetters] = useState('');
  const [numberOfFlavors, setNumberOfFlavors] = useState('');

  useEffect(() => {
    if (!product || !product.title || product.slug !== match.params.slug) {
      dispatch(listProductDetails(match.params.slug));
    } else {
      if (product?.productType === 'Cupcake') {
        setCupcakeShares([
          ...product?.productSpecifics?.shares?.map((ps) => ({
            ...ps.share,
            price: ps.price,
          })),
        ]);
        setCupcakeCakes([...product?.productSpecifics.cakes]);
        setCupcakeFodders([...product?.productSpecifics.fodders]);
        setCupcakeCreamColors([...product?.productSpecifics.creamColors]);
      }
      if (product?.productType === 'Macaron') {
        setMacaronShares([
          ...product?.productSpecifics?.shares?.map((ps) => ({
            ...ps.share,
            price: ps.price,
          })),
        ]);
        setMacaronShellColors([...product?.productSpecifics.shellColors]);
        setMacaronFodders([...product?.productSpecifics.fodders]);
      }
      if (
        product.productType === 'Number Cake' ||
        product.productType === 'Letter Cake'
      ) {
        setNumberLetterCakeShares([
          ...product?.productSpecifics?.shares?.map((ps) => ({
            ...ps.share,
            price: ps.price,
          })),
        ]);
        setNumberLetterCakeBiscuits([...product?.productSpecifics.biscuits]);
        setNumberLetterCakeCreams([...product?.productSpecifics.creams]);
        setNumberLetterCakeToppings([...product?.productSpecifics.toppings]);
        setNumberOfNumbersOrLetters(
          product?.productSpecifics.numberOfNumbersOrLetters
        );
        setNumberOfFlavors(product?.productSpecifics.numberOfFlavors);
      }
    }
  }, [dispatch, match, product]);

  useEffect(() => {
    if (
      product.productType === 'Number Cake' ||
      product.productType === 'Letter Cake'
    ) {
      if (numberLetterCakeShares?.length > 0) {
        setNumberLetterCakeShare(numberLetterCakeShares[0]);
      }
      if (numberLetterCakeBiscuits?.length > 0) {
        setNumberLetterCakeBiscuit(numberLetterCakeBiscuits[0]);
        setNumberLetterCakeBiscuit2(numberLetterCakeBiscuits[0]);
      }
      if (numberLetterCakeCreams?.length > 0) {
        setNumberLetterCakeCream(numberLetterCakeCreams[0]);
        setNumberLetterCakeCream2(numberLetterCakeCreams[0]);
      }
    }
    if (product?.productType === 'Cupcake') {
      if (cupcakeShares?.length > 0) {
        setCupcakeShare(cupcakeShares[0]);
      }
      if (cupcakeCakes?.length > 0) {
        setCupcakeCake(cupcakeCakes[0]);
        setCupcakeCake2(cupcakeCakes[0]);
      }
      if (cupcakeFodders?.length > 0) {
        setCupcakeFodder(cupcakeFodders[0]);
        setCupcakeFodder2(cupcakeFodders[0]);
      }
      if (cupcakeCreamColors?.length > 0) {
        setCupcakeCreamColor(cupcakeCreamColors[0]);
        setCupcakeCreamColor2(cupcakeCreamColors[0]);
      }
    }
    if (product?.productType === 'Macaron') {
      if (macaronShares?.length > 0) {
        setMacaronShare(macaronShares[0]);
      }
      if (macaronShellColors?.length > 0) {
        setMacaronShellColor(macaronShellColors[0]);
      }
      if (macaronFodders?.length > 0) {
        setMacaronFodder(macaronFodders[0]);
      }
    }
  }, [
    cupcakeShares,
    cupcakeCakes,
    cupcakeFodders,
    cupcakeCreamColors,
    numberLetterCakeShares,
    numberLetterCakeBiscuits,
    numberLetterCakeCreams,
    macaronShares,
    macaronShellColors,
    macaronFodders,
    product,
  ]);

  useEffect(() => {
    if (product?.productType === 'Cupcake') {
      setPrice(Number(cupcakeShare?.price));
    }
    if (product?.productType === 'Macaron') {
      setPrice(Number(macaronShare?.price));
    }
    if (
      product.productType === 'Number Cake' ||
      product.productType === 'Letter Cake'
    ) {
      setPrice(Number(numberLetterCakeShare?.price));
    }
  }, [cupcakeShare, numberLetterCakeShare, macaronShare, product]);

  const disableRemainingToppings = (slectedToppings, toppings) => {
    return toppings.map((topping) => {
      const key = Object.keys(topping)[0];
      return (
        (topping.disabled = !slectedToppings.some(
          (selectedTopping) =>
            key in selectedTopping && selectedTopping[key] === topping[key]
        )),
        topping
      );
    });
  };
  useEffect(() => {
    if (numberLetterCakeSelectedToppings.length === 3) {
      setNumberLetterCakeToppings([
        ...disableRemainingToppings(
          numberLetterCakeSelectedToppings,
          numberLetterCakeToppings
        ),
      ]);
    } else {
      if (
        product._id &&
        (product.productType === 'Number Cake' ||
          product.productType === 'Letter Cake')
      ) {
        setNumberLetterCakeToppings([
          ...product?.productSpecifics?.toppings?.map((pt) => ({
            ...pt,
            disabled: false,
          })),
        ]);
      }
    }
    if (numberLetterCakeSelectedToppings2.length === 3) {
      setNumberLetterCakeToppings2([
        ...disableRemainingToppings(
          numberLetterCakeSelectedToppings2,
          numberLetterCakeToppings2
        ),
      ]);
    } else {
      if (
        product._id &&
        (product.productType === 'Number Cake' ||
          product.productType === 'Letter Cake')
      ) {
        setNumberLetterCakeToppings2([
          ...product?.productSpecifics?.toppings?.map((pt) => ({
            ...pt,
            disabled: false,
          })),
        ]);
      }
    }
    if (cupcakeSelectedToppings.length === 3) {
      setCupcakeToppings([
        ...disableRemainingToppings(cupcakeSelectedToppings, cupcakeToppings),
      ]);
    } else {
      if (product._id && product?.productType === 'Cupcake') {
        setCupcakeToppings([
          ...product?.productSpecifics?.toppings?.map((pt) => ({
            ...pt,
            disabled: false,
          })),
        ]);
      }
    }
    if (cupcakeSelectedToppings2.length === 3) {
      setCupcakeToppings2([
        ...disableRemainingToppings(cupcakeSelectedToppings2, cupcakeToppings2),
      ]);
    } else {
      if (product._id && product?.productType === 'Cupcake') {
        setCupcakeToppings2([
          ...product?.productSpecifics?.toppings?.map((pt) => ({
            ...pt,
            disabled: false,
          })),
        ]);
      }
    }
    if (brownieSelectedToppings.length === 3) {
      setBrownieToppings([
        ...disableRemainingToppings(brownieSelectedToppings, brownieToppings),
      ]);
    } else {
      if (
        product._id &&
        product?.productType === 'Brownie' &&
        product?.productSpecifics?.toppings.length > 0
      ) {
        setBrownieToppings([
          ...product?.productSpecifics?.toppings?.map((pt) => ({
            ...pt,
            disabled: false,
          })),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cupcakeSelectedToppings,
    cupcakeSelectedToppings2,
    numberLetterCakeSelectedToppings,
    numberLetterCakeSelectedToppings2,
    brownieSelectedToppings,
    product,
  ]);

  useEffect(() => {
    if (product?._id) {
      const blocksFromHtml = htmlToDraft(product.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const currentContentAsHTML = convertToHTML(contentState);
      setConvertedContent(currentContentAsHTML);
    }
  }, [product]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div className='relative mt-20'>
        <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start'>
          <div className='relative sm:py-16 lg:py-0'>
            <div
              aria-hidden='true'
              className='hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen'
            >
              <div className='absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72' />
              <svg
                className='absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12'
                width={404}
                height={392}
                fill='none'
                viewBox='0 0 404 392'
              >
                <defs>
                  <pattern
                    id='02f20b47-fd69-4224-a62a-4c9de5c763f7'
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits='userSpaceOnUse'
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className='text-gray-200'
                      fill='currentColor'
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill='url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)'
                />
              </svg>
            </div>
            <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20'>
              {product?.images?.length > 0 ? (
                <Carousel
                  showArrows={false}
                  showStatus={false}
                  showIndicators={false}
                  infiniteLoop={false}
                >
                  {product?.images?.map((image) => (
                    <img
                      src={image.imageURL}
                      key={image.public_id}
                      alt={image.public_id}
                    />
                  ))}
                </Carousel>
              ) : (
                <ProductNoImage />
              )}
            </div>
          </div>

          <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0'>
            {/* Description area */}
            <div className='pt-12 sm:pt-16 lg:pt-20'>
              <h2 className='text-4xl text-blue-gray-800 font-extrabold font-hind tracking-tight sm:text-5xl'>
                {product?.title}
              </h2>
              <h2 className='mt-4 text-2xl text-rose-500 font-extrabold font-poppins tracking-tight sm:text-3xl'>
                {product?.price}
              </h2>
              <div
                className='mt-6 text-blue-gray-500 font-hind space-y-6'
                dangerouslySetInnerHTML={createMarkup(convertedContent)}
              ></div>
            </div>

            {/* Specifics section */}
            <div className='mt-10'>
              {product?.productType === 'Cupcake' && (
                <CupcakePage
                  cupcakeShares={cupcakeShares}
                  cupcakeShare={cupcakeShare}
                  setCupcakeShare={setCupcakeShare}
                  price={price}
                  cupcakeCakes={cupcakeCakes}
                  cupcakeCake={cupcakeCake}
                  cupcakeCake2={cupcakeCake2}
                  setCupcakeCake={setCupcakeCake}
                  setCupcakeCake2={setCupcakeCake2}
                  cupcakeFodders={cupcakeFodders}
                  cupcakeFodder={cupcakeFodder}
                  cupcakeFodder2={cupcakeFodder2}
                  setCupcakeFodder={setCupcakeFodder}
                  setCupcakeFodder2={setCupcakeFodder2}
                  cupcakeCreamColors={cupcakeCreamColors}
                  cupcakeCreamColor={cupcakeCreamColor}
                  cupcakeCreamColor2={cupcakeCreamColor2}
                  setCupcakeCreamColor={setCupcakeCreamColor}
                  setCupcakeCreamColor2={setCupcakeCreamColor2}
                  cupcakeToppings={cupcakeToppings}
                  cupcakeToppings2={cupcakeToppings2}
                  cupcakeSelectedToppings={cupcakeSelectedToppings}
                  cupcakeSelectedToppings2={cupcakeSelectedToppings2}
                  setCupcakeSelectedToppings={setCupcakeSelectedToppings}
                  setCupcakeSelectedToppings2={setCupcakeSelectedToppings2}
                  overrideStrings={MULTISELECT_INTERNATIONALIZATION}
                  ArrowRenderer={ArrowRenderer}
                  ClearIcon={<CustomClearIcon />}
                  ClearSelectedIcon={<CustomClearIcon />}
                  cupcakeDescription={cupcakeDescription}
                  cupcakeDescriptionOnChange={(e) =>
                    setCupcakeDescription(e.target.value)
                  }
                />
              )}

              {(product?.productType === 'Number Cake' ||
                product?.productType === 'Letter Cake') && (
                <NumberLetterCakePage
                  numberLetterCakeShares={numberLetterCakeShares}
                  numberLetterCakeShare={numberLetterCakeShare}
                  setNumberLetterCakeShare={setNumberLetterCakeShare}
                  numberLetterCakeBiscuits={numberLetterCakeBiscuits}
                  numberLetterCakeBiscuit={numberLetterCakeBiscuit}
                  numberLetterCakeBiscuit2={numberLetterCakeBiscuit2}
                  setNumberLetterCakeBiscuit={setNumberLetterCakeBiscuit}
                  setNumberLetterCakeBiscuit2={setNumberLetterCakeBiscuit2}
                  numberLetterCakeCreams={numberLetterCakeCreams}
                  numberLetterCakeCream={numberLetterCakeCream}
                  setNumberLetterCakeCream={setNumberLetterCakeCream}
                  numberLetterCakeCream2={numberLetterCakeCream2}
                  setNumberLetterCakeCream2={setNumberLetterCakeCream2}
                  caracters={numberLetterCakeCaracters}
                  onCaractersChange={(e) =>
                    setNumberLetterCakeCaracters(e.target.value)
                  }
                  numberOfNumbersOrLetters={numberOfNumbersOrLetters}
                  numberLetterCakeToppings={numberLetterCakeToppings}
                  numberLetterCakeToppings2={numberLetterCakeToppings2}
                  numberLetterCakeSelectedToppings={
                    numberLetterCakeSelectedToppings
                  }
                  numberLetterCakeSelectedToppings2={
                    numberLetterCakeSelectedToppings2
                  }
                  setNumberLetterCakeSelectedToppings={
                    setNumberLetterCakeSelectedToppings
                  }
                  setNumberLetterCakeSelectedToppings2={
                    setNumberLetterCakeSelectedToppings2
                  }
                  price={price}
                  numberOfFlavors={numberOfFlavors}
                  overrideStrings={MULTISELECT_INTERNATIONALIZATION}
                  ArrowRenderer={ArrowRenderer}
                  ClearIcon={<CustomClearIcon />}
                  ClearSelectedIcon={<CustomClearIcon />}
                />
              )}

              {product?.productType === 'Macaron' && (
                <MacaronPage
                  macaronShares={macaronShares}
                  macaronShare={macaronShare}
                  setMacaronShare={setMacaronShare}
                  price={price}
                  macaronShellColors={macaronShellColors}
                  macaronShellColor={macaronShellColor}
                  setMacaronShellColor={setMacaronShellColor}
                  macaronFodders={macaronFodders}
                  macaronFodder={macaronFodder}
                  setMacaronFodder={setMacaronFodder}
                />
              )}

              {product?.productType === 'Brownie' && brownieToppings.length > 0 && (
                <BrowniePage
                  brownieToppings={brownieToppings}
                  brownieSelectedToppings={brownieSelectedToppings}
                  setBrownieSelectedToppings={setBrownieSelectedToppings}
                  overrideStrings={MULTISELECT_INTERNATIONALIZATION}
                  ArrowRenderer={ArrowRenderer}
                  ClearIcon={<CustomClearIcon />}
                  ClearSelectedIcon={<CustomClearIcon />}
                />
              )}

              <div className='mt-10'>
                <CustomButton
                  type='button'
                  onClick={() => setOpenSlideOver(true)}
                  customStyles='w-full items-center uppercase block border border-transparent px-6 py-3 text-white bg-rose-500 hover:bg-rose-600 focus:outline-none'
                >
                  <ShoppingCartIcon
                    className='-ml-1 mr-3 h-5 w-5'
                    aria-hidden='true'
                  />
                  Ajouter au panier
                </CustomButton>
                <CustomButton
                  type='button'
                  customStyles='w-full items-center uppercase mt-2 block border border-blue-gray-400 px-6 py-3 text-blue-gray-700 bg-white hover:bg-blue-gray-100 focus:outline-none'
                >
                  <HeartIcon
                    className='-ml-1 mr-3 h-5 w-5'
                    aria-hidden='true'
                  />
                  Ajouter à la liste de souhaits
                </CustomButton>
              </div>

              <div className='mt-6 border-t border-blue-gray-200 py-6 space-y-6'>
                <div>
                  <h2 className='text-sm font-medium text-blue-gray-500 uppercase font-hind tracking-tight'>
                    Catégorie
                  </h2>
                  <div className='mt-2 leading-8'>
                    <span className='inline'>
                      <a
                        href='#'
                        className='capitalize relative inline-flex items-center rounded-full border border-blue-gray-300 px-3 py-0.5'
                      >
                        <div className='absolute flex-shrink-0 flex items-center justify-center'>
                          <span
                            className='h-1.5 w-1.5 rounded-full bg-violet-600'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='ml-3.5 text-sm font-medium text-blue-gray-800'>
                          {product?.category?.name}
                        </div>
                      </a>{' '}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className='text-sm font-medium text-blue-gray-500 uppercase font-hind tracking-tight'>
                    Sous Catégories
                  </h2>
                  <ul className='mt-2 leading-8'>
                    {product?.subcategories?.map((sc) => (
                      <li className='inline' key={sc._id}>
                        <a
                          href='#'
                          className='capitalize relative inline-flex items-center rounded-full border border-blue-gray-300 px-3 py-0.5'
                        >
                          <div className='absolute flex-shrink-0 flex items-center justify-center'>
                            <span
                              className='h-1.5 w-1.5 rounded-full bg-rose-500'
                              aria-hidden='true'
                            />
                          </div>
                          <div className='ml-3.5 text-sm font-medium text-blue-gray-900'>
                            {sc?.name}
                          </div>
                        </a>{' '}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlideOver open={openSlideOver} setOpen={setOpenSlideOver} />
    </>
  );
};

export default Product;

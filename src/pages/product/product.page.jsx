import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { ShoppingCartIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

import { ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import ProductNoImage from '../../components/product-image/product-no-image.component';
import CustomButton from '../../components/custom-button/custom-button.component.jsx';
import CustomLink from '../../components/custom-link/custom-link.component';
import SlideOver from '../../components/slide-over/slide-over.component.jsx';
import SlideOverCartItem from '../../components/slide-over-cart-item/slide-over-cart-item.component';
import CupcakePage from '../../components/product-types/cupcake/cupcake-page.component';
import NumberLetterCakePage from '../../components/product-types/number-letter-cake/number-letter-cake-page.component';
import MacaronPage from '../../components/product-types/macaron/macaron-page.component';
import BrowniePage from '../../components/product-types/brownie/brownie-page.component';
import Notification from '../../components/notification/notification.component.jsx';
import ProductRating from '../../components/product-rating/product-rating.component.jsx';
import StarRatingModal from '../../components/star-rating/star-rating.component.jsx';
import RelatedProducts from '../../components/related-products/related-products.component.jsx';
import ProductCatSub from '../../components/product-cat-and-sub/product-cat-and-sub.component';
import ProductQuantity from '../../components/product-quantity/product-quantity.component';

import {
  listProductDetails,
  createProductReview,
} from '../../redux/reducers/product/product.actions';
import { addToCart } from '../../redux/reducers/cart/cart.actions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/reducers/product/product.types';

import { MULTISELECT_INTERNATIONALIZATION } from '../../constants/admin.product.constants';
import { PRODUCT_PAGE_SVG_PATTERN } from '../../constants/product-page.constants';

import { ArrowRenderer, CustomClearIcon } from '../../utils/components';

const Product = ({ history, match }) => {
  const [convertedContent, setConvertedContent] = useState(null);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartProducts } = cart;
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productCreateReview;

  //Product
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);

  //Rating modal
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [projectRated, setProjectRated] = useState('');
  const cancelButtonRef = useRef();

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
  //End Number/Letter Cake

  const disableRemainingToppings = (selectedToppings, toppings) => {
    return toppings.map((topping) => {
      const key = Object.keys(topping)[0];
      return (
        (topping.disabled = !selectedToppings.some(
          (selectedTopping) =>
            key in selectedTopping && selectedTopping[key] === topping[key]
        )),
        topping
      );
    });
  };

  const submitRating = () => {
    dispatch(createProductReview(projectRated, rating));
  };

  const cancelRating = () => {
    setOpenRatingModal(false);
  };

  const handleRatingModal = () => {
    if (userInfo?.token) {
      setOpenRatingModal(true);
    } else {
      toast(
        <Notification warning headline='Hmmmm...'>
          Vous devez être connecté pour soumettre un retour!
        </Notification>
      );
      history.push({
        pathname: '/login',
        state: { from: `/product/${product?.slug}` },
      });
    }
  };

  const handleAddToCart = () => {
    let cartItem = {
      _id: product?._id,
      title: product?.title,
      slug: product?.slug,
      imageURL: product?.images[0]?.imageURL,
      price,
      category: product?.category?.name,
      productType: product?.productType,
      quantity,
      shipping: product?.shipping,
    };

    if (product?.productType === 'Cupcake') {
      cartItem = {
        ...cartItem,
        share: cupcakeShare?.name,
        cake: cupcakeCake?.name,
        fodder: cupcakeFodder?.name,
        creamColor: cupcakeCreamColor?.name,
        toppings: cupcakeSelectedToppings,
        cake2: cupcakeCake2?.name,
        fodder2: cupcakeFodder2?.name,
        creamColor2: cupcakeCreamColor2?.name,
        toppings2: cupcakeSelectedToppings2,
        description: cupcakeDescription,
      };
    }
    if (
      product?.productType === 'Number Cake' ||
      product?.productType === 'Letter Cake'
    ) {
      if (numberLetterCakeCaracters.length < Number(numberOfNumbersOrLetters)) {
        toast(
          <Notification error headline='Erreur commande'>
            Vous devez fournir {numberOfNumbersOrLetters} caractère(s)
          </Notification>
        );
        return;
      }

      if (!numberLetterCakeSelectedToppings.length) {
        toast(
          <Notification error headline='Erreur commande'>
            Vous devez selectionnez 2 à 3 toppings!
          </Notification>
        );
        return;
      }
      cartItem = {
        ...cartItem,
        share: numberLetterCakeShare?.name,
        caracters: numberLetterCakeCaracters,
        biscuit: numberLetterCakeBiscuit?.name,
        cream: numberLetterCakeCream?.name,
        toppings: numberLetterCakeSelectedToppings,
        numberOfFlavors,
      };

      if (numberOfFlavors >= 2) {
        if (!numberLetterCakeSelectedToppings2.length) {
          toast(
            <Notification error headline='Erreur commande'>
              Vous devez selectionnez 2 à 3 toppings!
            </Notification>
          );
          return;
        }
        cartItem = {
          ...cartItem,
          biscuit2: numberLetterCakeBiscuit2?.name,
          cream2: numberLetterCakeCream2?.name,
          toppings2: numberLetterCakeSelectedToppings2,
        };
      }
    }
    if (product?.productType === 'Macaron') {
      cartItem = {
        ...cartItem,
        share: macaronShare?.name,
        shellColor: macaronShellColor?.name,
        fodder: macaronFodder?.name,
      };
    }
    if (product?.productType === 'Brownie') {
      cartItem = {
        ...cartItem,
        toppings: brownieSelectedToppings,
      };
    }
    dispatch(addToCart(cartItem));
    setOpenSlideOver(true);
  };

  const changeRating = (newRating, name) => {
    setRating(newRating);
    setProjectRated(name);
  };

  useEffect(() => {
    dispatch(listProductDetails(match.params.slug));
    if (successProductReview) {
      toast(
        <Notification success headline='Merci!'>
          Votre retour à bien été pris en compte
        </Notification>
      );

      setProjectRated('');
      setOpenRatingModal(false);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (errorProductReview) {
      toast(
        <Notification error headline='Erreur!'>
          {errorProductReview}
        </Notification>
      );
      setProjectRated('');
      setOpenRatingModal(false);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
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
      product?.productType === 'Number Cake' ||
      product?.productType === 'Letter Cake'
    ) {
      setNumberLetterCakeShares([
        ...product?.productSpecifics?.shares?.map((ps) => ({
          ...ps.share,
          price: ps.price,
        })),
      ]);
      setNumberLetterCakeBiscuits([...product?.productSpecifics.biscuits]);
      setNumberLetterCakeCreams([...product?.productSpecifics.creams]);
      setNumberOfNumbersOrLetters(
        product?.productSpecifics.numberOfNumbersOrLetters
      );
      setNumberOfFlavors(product?.productSpecifics.numberOfFlavors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    match,
    product?.productType,
    successProductReview,
    errorProductReview,
  ]);

  useEffect(() => {
    if (
      product?.productType === 'Number Cake' ||
      product?.productType === 'Letter Cake'
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
    product?.productType,
  ]);

  useEffect(() => {
    const setUserRating = () => {
      if (product?.ratings && userInfo?.token) {
        const userReview = product?.ratings.find(
          (review) => review.user.toString() === userInfo._id.toString()
        );
        userReview && setRating(userReview?.rating);
      }
    };
    setUserRating();
  }, [product?.ratings, userInfo?._id, userInfo?.token]);

  useEffect(() => {
    if (product?.productType === 'Cupcake') {
      setPrice(Number(cupcakeShare?.price));
    }
    if (product?.productType === 'Macaron') {
      setPrice(Number(macaronShare?.price));
    }
    if (
      product?.productType === 'Number Cake' ||
      product?.productType === 'Letter Cake'
    ) {
      setPrice(Number(numberLetterCakeShare?.price));
    }
    if (
      product?.productType === 'Gateau Nature' ||
      product?.productType === 'Brownie'
    ) {
      setPrice(Number(product?.productSpecifics.price));
    }
  }, [cupcakeShare, numberLetterCakeShare, macaronShare, product]);

  useEffect(() => {
    if (numberLetterCakeSelectedToppings.length === 3) {
      setNumberLetterCakeToppings((previousNumberLetterCakeToppings) => [
        ...disableRemainingToppings(
          numberLetterCakeSelectedToppings,
          previousNumberLetterCakeToppings
        ),
      ]);
    } else {
      if (
        product?._id &&
        (product?.productType === 'Number Cake' ||
          product?.productType === 'Letter Cake')
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
      setNumberLetterCakeToppings2((previousNumberLetterCakeToppings2) => [
        ...disableRemainingToppings(
          numberLetterCakeSelectedToppings2,
          previousNumberLetterCakeToppings2
        ),
      ]);
    } else {
      if (
        product?._id &&
        (product?.productType === 'Number Cake' ||
          product?.productType === 'Letter Cake')
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
      setCupcakeToppings((previousCupcakeToppings) => [
        ...disableRemainingToppings(
          cupcakeSelectedToppings,
          previousCupcakeToppings
        ),
      ]);
    } else {
      if (product?._id && product?.productType === 'Cupcake') {
        setCupcakeToppings([
          ...product?.productSpecifics?.toppings?.map((pt) => ({
            ...pt,
            disabled: false,
          })),
        ]);
      }
    }
    if (cupcakeSelectedToppings2.length === 3) {
      setCupcakeToppings2((previousCupcakeToppings2) => [
        ...disableRemainingToppings(
          cupcakeSelectedToppings2,
          previousCupcakeToppings2
        ),
      ]);
    } else {
      if (product?._id && product?.productType === 'Cupcake') {
        setCupcakeToppings2([
          ...product?.productSpecifics?.toppings?.map((pt) => ({
            ...pt,
            disabled: false,
          })),
        ]);
      }
    }
    if (brownieSelectedToppings.length === 3) {
      setBrownieToppings((previousBrownieToppings) => [
        ...disableRemainingToppings(
          brownieSelectedToppings,
          previousBrownieToppings
        ),
      ]);
    } else {
      if (
        product?._id &&
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
              {PRODUCT_PAGE_SVG_PATTERN}
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
              <ProductRating
                handleRatingModal={handleRatingModal}
                productId={product?._id}
                ratings={product?.ratings}
              />
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

              {product?.productType === 'Brownie' &&
                brownieToppings.length > 0 && (
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

              <ProductQuantity quantity={quantity} setQuantity={setQuantity} />

              <div className='mt-9 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <CustomButton
                  type='button'
                  onClick={handleAddToCart}
                  customStyles='w-full inline-flex text-base border border-transparent px-6 py-6 text-white bg-rose-500 hover:bg-rose-600 focus:outline-none sm:col-start-1 sm:text-sm'
                >
                  <ShoppingCartIcon
                    className='-ml-1 mr-3 h-5 w-5'
                    aria-hidden='true'
                  />
                  Ajouter au panier
                </CustomButton>
                <CustomButton
                  type='button'
                  customStyles='mt-3 w-full inline-flex text-base border border-blue-gray-400 px-6 py-6 text-blue-gray-700 bg-white hover:bg-blue-gray-100 focus:outline-none sm:mt-0 sm:col-start-2 sm:text-sm'
                >
                  <HeartIcon
                    className='-ml-1 mr-3 h-5 w-5'
                    aria-hidden='true'
                  />
                  Ajouter à mes souhaits
                </CustomButton>
              </div>
              <ProductCatSub
                category={product?.category}
                subcategories={product?.subcategories}
              />
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
      <SlideOver
        title={'Mon Panier'}
        open={openSlideOver}
        setOpen={setOpenSlideOver}
        showStickyFooter={true}
        button2={
          <CustomLink
            url='/cart'
            type='link-button'
            custom='w-full text-base justify-between px-4 py-4 text-white bg-rose-500 hover:bg-rose-600 sm:col-start-1 sm:text-sm uppercase col-span-2'
          >
            Voir mon panier
            <ArrowRightIcon className='ml-3 -mr-1 h-5 w-5' aria-hidden='true' />
          </CustomLink>
        }
      >
        <SlideOverCartItem cartProducts={cartProducts} />
      </SlideOver>
      <StarRatingModal
        openRating={openRatingModal}
        setOpenRating={setOpenRatingModal}
        onSubmit={submitRating}
        onCancel={cancelRating}
        cancelRef={cancelButtonRef}
        loading={loadingProductReview}
        productId={product?._id}
        rating={rating}
        changeRating={changeRating}
      />
    </>
  );
};

export default Product;

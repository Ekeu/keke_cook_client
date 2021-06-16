import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import MultiSelect from 'react-multi-select-component';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { v4 as uuidv4 } from 'uuid';

import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { convertToHTML } from 'draft-convert';

import FormInput from '../../../components/form-input/form-input.component.jsx';
import Select from '../../../components/select/select.component';
import CupCake from '../../../components/product-types/cupcake/cupcake.component';
import Macaron from '../../../components/product-types/macaron/macaron.component';
import NumberLetterCake from '../../../components/product-types/number-letter-cake/number-letter-cake.component';
import Brownie from '../../../components/product-types/brownie/brownie.component';
import Loader from '../../../components/loader/loader.component';
import Notification from '../../../components/notification/notification.component.jsx';
import InfoColumn from '../../../components/info-column/info-column.component.jsx';
import CustomButton from '../../../components/custom-button/custom-button.component.jsx';
import ImageUpload from '../../../components/image-upload/image-upload.component.jsx';

import {
  getCategories,
  getSubcategoriesFromCategory,
} from '../../../redux/reducers/category/category.actions';

import {
  listProductDetails,
  updateProduct,
} from '../../../redux/reducers/product/product.actions';
import { PRODUCT_UPDATE_RESET } from '../../../redux/reducers/product/product.types';

import {
  currencyFormatter,
  filterShares,
  filterData,
  updateSelectShares,
  updatePrice,
  updateAfterRemove,
} from '../../../utils/functions';
import { ArrowRenderer, CustomClearIcon } from '../../../utils/components';

import {
  PRODUCT_SHIPPING,
  PRODUCT_TYPES,
  PRODUCT_COLORS,
  CUPCAKE_SHARES,
  CUPCAKE_CAKE_TYPE,
  CUPCAKE_FODDER,
  CUPCAKE_CREAM_COLOR,
  CUPCAKE_TOPPINGS,
  NUMBER_LETTER_CAKE_SHARES,
  NUMBER_LETTER_CAKE_BISCUIT,
  NUMBER_LETTER_CAKE_CREAM,
  NUMBER_LETTER_CAKE_TOPPINGS,
  BROWNIE_TOPPINGS,
  MACARON_SHELL_COLOR,
  MACARON_FODDER,
  MACARON_SHARES,
  MULTISELECT_INTERNATIONALIZATION,
} from '../../../constants/admin.product.constants';

const ProductUpdate = ({ match, history }) => {
  const productSlug = match.params.slug;

  //Category List Redux State
  const categoryList = useSelector((state) => state.categoryList);
  const { success: successList, categories } = categoryList;

  //Subcategories belonging to a parent category - Redux State
  const categorySubcategoriesList = useSelector(
    (state) => state.categorySubcategoriesList
  );
  const { subcategories } = categorySubcategoriesList;

  //User Redux State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Component states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(PRODUCT_SHIPPING[0]);
  const [selectedType, setSelectedType] = useState(PRODUCT_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCT_COLORS[0]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [images, setImages] = useState([]);
  const [rangePrice, setRangePrice] = useState(0);
  const [convertedContent, setConvertedContent] = useState(null);

  //Cupcake Component State
  const [cupcakeShares, setCupcakeShares] = useState([
    { share: CUPCAKE_SHARES[0], price: 1 },
  ]);
  const [selectedCupcakeCakeType, setSelectedCupcakeCakeType] = useState([]);
  const [selectedCupcakeFodderType, setSelectedCupcakeFodderType] = useState(
    []
  );
  const [selectedCupcakeCreamColorType, setSelectedCupcakeCreamColorType] =
    useState([]);
  const [selectedCupcakeToppingType, setSelectedCupcakeToppingType] = useState(
    []
  );
  //End Cupcake

  //Number or Letter Cake Component State
  const [numberLetterCakeShares, setNumberLetterCakeShares] = useState([
    { share: NUMBER_LETTER_CAKE_SHARES[0], price: 1 },
  ]);
  const [
    selectedNumberLetterCakeBiscuitType,
    setSelectedNumberLetterCakeBiscuitType,
  ] = useState([]);
  const [
    selectedNumberLetterCakeCreamType,
    setSelectedNumberLetterCakeCreamType,
  ] = useState([]);
  const [
    selectedNumberLetterCakeToppingType,
    setSelectedNumberLetterCakeToppingType,
  ] = useState([]);
  //End Number or Lettter Cake

  //Macaron Component State
  const [macaronSharesList, setMacaronSharesList] = useState([
    { share: MACARON_SHARES[0], price: 1 },
  ]);
  const [selectedMacaronShellColorType, setSelectedMacaronShellColorType] =
    useState([]);
  const [selectedMacaronFodderType, setSelectedMacaronFodderType] = useState(
    []
  );
  //End Macaron

  //Brownie Component State
  const [selectedBrownieToppingType, setSelectedBrownieToppingType] = useState(
    []
  );
  //End Brownie

  //React Hook Form
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  //Methods
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const onSubmit = handleSubmit(
    ({
      productTitle,
      productPrice,
      productInputPrice,
      numberOfNumbersOrLetters,
      numberOfFlavors,
    }) => {
      let productSpecifics;
      if (selectedType.name === 'Cupcake') {
        productSpecifics = {
          shares: cupcakeShares,
          filteredShares: filterShares(cupcakeShares),
          cakes: selectedCupcakeCakeType,
          filteredCakes: filterData(selectedCupcakeCakeType),
          fodders: selectedCupcakeFodderType,
          filteredFodders: filterData(selectedCupcakeFodderType),
          creamColors: selectedCupcakeCreamColorType,
          filteredCreamColors: filterData(selectedCupcakeCreamColorType),
          toppings: selectedCupcakeToppingType,
          filteredToppingss: filterData(selectedCupcakeToppingType),
        };
      }
      if (selectedType.name === 'Brownie') {
        productSpecifics = {
          price: productInputPrice,
          toppings: selectedBrownieToppingType,
          filteredToppings: filterData(selectedBrownieToppingType),
        };
      }
      if (selectedType.name === 'Gateau Nature') {
        productSpecifics = {
          price: productInputPrice,
        };
      }
      if (selectedType.name === 'Macaron') {
        productSpecifics = {
          shares: macaronSharesList,
          filteredShares: filterShares(macaronSharesList),
          shellColors: selectedMacaronShellColorType,
          filteredShellColors: filterData(selectedMacaronShellColorType),
          fodders: selectedMacaronFodderType,
          filteredFodders: filterData(selectedMacaronFodderType),
        };
      }
      if (
        selectedType.name === 'Number Cake' ||
        selectedType.name === 'Letter Cake'
      ) {
        productSpecifics = {
          shares: numberLetterCakeShares,
          filteredShares: filterShares(numberLetterCakeShares),
          biscuits: selectedNumberLetterCakeBiscuitType,
          filteredBiscuits: filterData(selectedNumberLetterCakeBiscuitType),
          creams: selectedNumberLetterCakeCreamType,
          filteredCreams: filterData(selectedNumberLetterCakeCreamType),
          toppings: selectedNumberLetterCakeToppingType,
          filteredToppingss: filterData(selectedNumberLetterCakeToppingType),
          numberOfNumbersOrLetters,
          numberOfFlavors,
        };
      }
      dispatch(
        updateProduct(product?.slug, {
          title: productTitle,
          description: convertedContent,
          price: productInputPrice
            ? currencyFormatter(productInputPrice)
            : productPrice,
          range_price: productInputPrice
            ? Number(productInputPrice)
            : rangePrice,
          shipping: selectedShipping.name,
          productType: selectedType.name,
          color: selectedColor.name,
          category: selectedCategory._id,
          images,
          subcategories: selectedSubcategory.map((ssc) => ssc._id),
          productSpecifics,
        })
      );
    }
  );

  //Cupcake methods
  const handleSelectedCupcakeShare = (data, index) => {
    setCupcakeShares(updateSelectShares(cupcakeShares, data, index));
  };
  const handleInputPriceShare = (e, index) => {
    setCupcakeShares(updatePrice(cupcakeShares, e, index));
  };
  const handleRemoveShare = (index) => {
    setCupcakeShares(updateAfterRemove(cupcakeShares, index));
  };
  const handleAddShare = () => {
    setCupcakeShares([
      ...cupcakeShares,
      { share: { ...CUPCAKE_SHARES[0], _id: uuidv4() }, price: 1 },
    ]);
  };

  //Number/Letter Cake Methods
  const handleSelectedNumberLetterCakeShare = (data, index) => {
    setNumberLetterCakeShares(
      updateSelectShares(numberLetterCakeShares, data, index)
    );
  };
  const handleInputPriceShareNumberLetterCake = (e, index) => {
    setNumberLetterCakeShares(updatePrice(numberLetterCakeShares, e, index));
  };
  const handleRemoveNumberLetterCakeShare = (index) => {
    setNumberLetterCakeShares(updateAfterRemove(numberLetterCakeShares, index));
  };
  const handleAddNumberLetterCakeShare = () => {
    setNumberLetterCakeShares([
      ...numberLetterCakeShares,
      { share: { ...NUMBER_LETTER_CAKE_SHARES[0], _id: uuidv4() }, price: 1 },
    ]);
  };

  //Macaron
  const handleSelectedMacaronShare = (data, index) => {
    setMacaronSharesList(updateSelectShares(macaronSharesList, data, index));
  };
  const handleInputPriceShareMacaron = (e, index) => {
    setMacaronSharesList(updatePrice(macaronSharesList, e, index));
  };
  const handleRemoveMacaronShare = (index) => {
    setMacaronSharesList(updateAfterRemove(macaronSharesList, index));
  };
  const handleAddMacaronShare = () => {
    setMacaronSharesList([
      ...macaronSharesList,
      { share: { ...MACARON_SHARES[0], _id: uuidv4() }, price: 1 },
    ]);
  };

  useEffect(() => {
    dispatch(getCategories());
    if (userInfo?.role !== 'admin') {
      history.push('/login');
    }
    if (error) {
      toast(
        <Notification error headline='Erreur de chargement'>
          {error}
        </Notification>
      );
    }
    if (errorUpdate) {
      toast(
        <Notification error headline='Erreur de mise à jour'>
          {errorUpdate}
        </Notification>
      );
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast(
        <Notification success headline='Mise à jour réussie'>
          La mise à jour du produit à réussie!
        </Notification>
      );
      history.push('/admin/products');
    } else {
      if (!product || !product.title || product.slug !== productSlug) {
        dispatch(listProductDetails(productSlug));
      } else {
        setValue('productTitle', product.title);
        const blocksFromHtml = htmlToDraft(product?.description);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        setRangePrice(product?.range_price);
        setEditorState(EditorState.createWithContent(contentState));
        setConvertedContent(
          convertToHTML(EditorState.createWithContent(contentState).getCurrentContent())
        );
        if (
          product.productType !== 'Brownie' &&
          product.productType !== 'Gateau Nature'
        ) {
          setValue('productPrice', product.price);
        } else {
          setValue('productInputPrice', product?.productSpecifics?.price);
        }
        setSelectedShipping(
          PRODUCT_SHIPPING.find((ps) => ps.name === product.shipping)
        );
        setSelectedType(
          PRODUCT_TYPES.find((pt) => pt.name === product.productType)
        );
        setSelectedColor(
          PRODUCT_COLORS.find((pc) => pc.name === product.color)
        );
        setSelectedCategory(product?.category);
        setSelectedSubcategory(
          product?.subcategories.map((psc) => ({
            ...psc,
            label: psc.name,
            value: psc.name.toLowerCase(),
            disabled: false,
          }))
        );
        setImages(product.images);

        if (product.productType === 'Cupcake') {
          setSelectedCupcakeCakeType(product.productSpecifics.cakes);
          setCupcakeShares(product.productSpecifics.shares);
          setSelectedCupcakeFodderType(product.productSpecifics.fodders);
          setSelectedCupcakeCreamColorType(
            product.productSpecifics.creamColors
          );
          setSelectedCupcakeToppingType(product.productSpecifics.toppings);
        }
        if (product.productType === 'Brownie') {
          setSelectedBrownieToppingType(product.productSpecifics.toppings);
        }
        if (product.productType === 'Macaron') {
          setSelectedMacaronShellColorType(
            product.productSpecifics.shellColors
          );
          setMacaronSharesList(product.productSpecifics.shares);
          setSelectedMacaronFodderType(product.productSpecifics.fodders);
        }
        if (
          product.productType === 'Number Cake' ||
          product.productType === 'Letter Cake'
        ) {
          setSelectedNumberLetterCakeBiscuitType(
            product.productSpecifics.biscuits
          );
          setNumberLetterCakeShares(product.productSpecifics.shares);
          setSelectedNumberLetterCakeCreamType(product.productSpecifics.creams);
          setSelectedNumberLetterCakeToppingType(
            product.productSpecifics.toppings
          );
          setValue(
            'numberOfNumbersOrLetters',
            product.productSpecifics.numberOfNumbersOrLetters
          );
          setValue('numberOfFlavors', product.productSpecifics.numberOfFlavors);
        }
      }
    }
  }, [
    dispatch,
    product,
    productSlug,
    setValue,
    error,
    errorUpdate,
    history,
    successUpdate,
    userInfo,
  ]);

  /**
   * Use Effect that checks that the categories have successfully loaded on mount,
   * then sets first category value in select and dispatches the method to load the sub categories
   * linked to the corresponding category
   */
  useEffect(() => {
    if (successList) {
      setSelectedCategory(product?.category);
      dispatch(getSubcategoriesFromCategory(product?.category?._id));
    }
  }, [product, successList, dispatch]);

  /**
   * Use Effect to update the price input field based on the price of the entered shares
   */
  useEffect(() => {
    let priceArray;
    if (selectedType.name === 'Cupcake') {
      priceArray = cupcakeShares.map((cs) => cs.price);
    }
    if (
      selectedType.name === 'Number Cake' ||
      selectedType.name === 'Letter Cake'
    ) {
      priceArray = numberLetterCakeShares.map((nlcs) => nlcs.price);
    }
    if (selectedType.name === 'Macaron') {
      priceArray = macaronSharesList.map((ms) => ms.price);
    }
    if (
      selectedType.name !== 'Brownie' &&
      selectedType.name !== 'Gateau Nature'
    ) {
      setValue(
        'productPrice',
        `${currencyFormatter(Math.min(...priceArray))} - ${currencyFormatter(
          Math.max(...priceArray)
        )}`
      );
      setRangePrice(Math.max(...priceArray));
    }
  }, [
    cupcakeShares,
    numberLetterCakeShares,
    macaronSharesList,
    selectedType,
    setValue,
  ]);

  /**
   * Use Effect to load the corresponding subcategories when parent category changes
   */
  useEffect(() => {
    if (selectedSubcategory[0]?.parentCategory !== selectedCategory?._id)
      setSelectedSubcategory([]);
    dispatch(getSubcategoriesFromCategory(selectedCategory?._id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, dispatch]);

  return (
    <div>
      {loading ? (
        <Loader height='h-10' width='h-10' />
      ) : (
        <>
          {' '}
          <div className='relative bg-rose-600 pb-32 overflow-hidden'>
            <div
              className='inset-y-0 absolute flex justify-center inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0'
              aria-hidden='true'
            >
              <div className='flex-grow bg-rose-800 bg-opacity-75' />
              <svg
                className='flex-shrink-0'
                width={1750}
                height={308}
                viewBox='0 0 1750 308'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  opacity='.75'
                  d='M1465.84 308L16.816 0H1750v308h-284.16z'
                  fill='#BE123C'
                />
                <path
                  opacity='.75'
                  d='M1733.19 0L284.161 308H0V0h1733.19z'
                  fill='#9F1239'
                />
              </svg>
              <div className='flex-grow bg-rose-700 bg-opacity-75' />
            </div>
            <header className='relative py-10'>
              <div className='max-w-7xl block lg:flex mx-auto px-4 sm:px-6 lg:px-8 justify-between'>
                <Link
                  to='/admin/products'
                  className='mb-3 lg:mb-0 inline-flex items-center'
                >
                  <ArrowLeftIcon
                    className='h-5 w-5 text-white'
                    aria-hidden='true'
                  />
                  <p className='text-md font-medium text-white font-hind ml-2'>
                    Retour
                  </p>
                </Link>
                <h1 className='text-5xl font-medium text-white font-hind'>
                  {product?.title}
                </h1>
              </div>
            </header>
          </div>
          <main className='relative -mt-32'>
            <div className='max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8'>
              <div className='bg-white rounded-lg overflow-visible'>
                <div className='lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x'>
                  <form className='lg:col-span-12' onSubmit={onSubmit}>
                    <div className='space-y-6 mt-2'>
                      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
                        <div className='md:grid md:grid-cols-3 md:gap-6'>
                          <InfoColumn headline='Informations Générales'>
                            Cette section regroupe les informations de base
                            nécéssaire pour tout produit
                          </InfoColumn>
                          <div className='mt-5 md:mt-0 md:col-span-2'>
                            <div className='space-y-6'>
                              <div className='grid grid-cols-3 gap-6'>
                                <FormInput
                                  id='productTitle'
                                  name='productTitle'
                                  type='text'
                                  label='productTitle'
                                  labelText='Titre'
                                  formInputWrapperClass='col-span-6'
                                  autoComplete='username'
                                  register={register('productTitle', {
                                    required: 'Saisissez le titre du produit',
                                    maxLength: {
                                      value: 32,
                                      message: 'Ce titre est trop long',
                                    },
                                    minLength: {
                                      value: 10,
                                      message: 'Ce titre est trop court',
                                    },
                                  })}
                                  placeholder='1 Number/Letter cake'
                                  error={errors.productTitle?.message}
                                />
                              </div>
                              <div className='font-hind'>
                                <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
                                  Description
                                </label>
                                <Editor
                                  editorState={editorState}
                                  wrapperClassName='custom-style-wrapper mb-16 lg:mb-0'
                                  toolbarClassName='custom-style-toolbar'
                                  editorClassName='custom-style-editor'
                                  toolbar={{
                                    fontFamily: {
                                      options: [
                                        'Arial',
                                        'Georgia',
                                        'Impact',
                                        'Tahoma',
                                        'Times New Roman',
                                        'Verdana',
                                        'Hind',
                                      ],
                                    },
                                  }}
                                  onEditorStateChange={onEditorStateChange}
                                />
                              </div>
                              <div className='grid grid-cols-6 gap-6 pt-8 2xl:pt-0'>
                                {selectedType.name !== 'Brownie' &&
                                selectedType.name !== 'Gateau Nature' ? (
                                  <FormInput
                                    id='productPrice'
                                    name='productPrice'
                                    type='text'
                                    label='productPrice'
                                    labelText='Prix'
                                    formInputWrapperClass='col-span-6 sm:col-span-3'
                                    autoComplete='off'
                                    register={register('productPrice')}
                                    placeholder='45.00 € – 86.00 €'
                                    helpText='Ce champ se remplira automatiquement.'
                                    idHelpText='price-description'
                                    readOnly={true}
                                  />
                                ) : (
                                  <FormInput
                                    id='productInputPrice'
                                    name='productInputPrice'
                                    type='number'
                                    label='productInputPrice'
                                    labelText='Prix'
                                    step='0.01'
                                    register={register('productInputPrice', {
                                      required: 'Saisissez le prix du produit',
                                      min: {
                                        value: 1,
                                        message:
                                          'Le prix ne doit pas être inférieur à 1',
                                      },
                                    })}
                                    formInputWrapperClass='col-span-6 sm:col-span-3'
                                    autoComplete='off'
                                    placeholder='12'
                                    error={errors.productInputPrice?.message}
                                  />
                                )}
                                <div className='col-span-6 sm:col-span-3'>
                                  <Select
                                    options={PRODUCT_SHIPPING}
                                    value={selectedShipping}
                                    onChange={setSelectedShipping}
                                    label={'Vous livrez ce produit?'}
                                  />
                                </div>
                              </div>
                              <div className='grid grid-cols-6 gap-6'>
                                <div className='col-span-6 sm:col-span-3'>
                                  <Select
                                    options={PRODUCT_TYPES}
                                    value={selectedType}
                                    onChange={setSelectedType}
                                    label={'Type de Produit'}
                                  />
                                </div>
                                <div className='col-span-6 sm:col-span-3'>
                                  <Select
                                    options={PRODUCT_COLORS}
                                    value={selectedColor}
                                    onChange={setSelectedColor}
                                    label={'Couleur'}
                                  />
                                </div>
                              </div>
                              <div className='grid grid-cols-6 gap-6'>
                                <div className='col-span-6 sm:col-span-3'>
                                  <Select
                                    options={categories}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    label={'Catégorie'}
                                  />
                                </div>
                                {subcategories?.length > 0 ? (
                                  <div className='col-span-6 sm:col-span-3'>
                                    <label className='mb-1 block text-sm font-medium text-blue-gray-700 font-hind'>
                                      Sous Catégorie(s)
                                    </label>
                                    <MultiSelect
                                      options={subcategories}
                                      value={selectedSubcategory}
                                      overrideStrings={
                                        MULTISELECT_INTERNATIONALIZATION
                                      }
                                      onChange={setSelectedSubcategory}
                                      ArrowRenderer={ArrowRenderer}
                                      ClearIcon={<CustomClearIcon />}
                                      ClearSelectedIcon={<CustomClearIcon />}
                                      labelledBy='Sous catégories'
                                      className='text-sm font-hind'
                                    />
                                  </div>
                                ) : (
                                  <FormInput
                                    id='no-subcategory'
                                    name='no-subcategory'
                                    type='text'
                                    label='no-subcategory'
                                    labelText='Sous Catégorie(s)'
                                    formInputWrapperClass='col-span-6 sm:col-span-3'
                                    autoComplete='username'
                                    disabled
                                    placeholder='Aucune sous catégorié'
                                  />
                                )}
                              </div>
                              <ImageUpload
                                images={images}
                                setImages={setImages}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedType.name !== 'Gateau Nature' && (
                        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
                          <div className='md:grid md:grid-cols-3 md:gap-6'>
                            <InfoColumn headline='Informations Détaillées'>
                              Cette section regroupe les informations
                              nécéssaires qui sont spécifique à chaque type de
                              produit
                            </InfoColumn>
                            <div className='mt-5 md:mt-0 md:col-span-2'>
                              {selectedType.name === 'Cupcake' && (
                                <CupCake
                                  cupcakeSharesOptions={CUPCAKE_SHARES}
                                  cupCakeSharesList={cupcakeShares}
                                  handleSelectedCupcakeShare={
                                    handleSelectedCupcakeShare
                                  }
                                  handleInputPriceShare={handleInputPriceShare}
                                  handleRemoveShare={handleRemoveShare}
                                  handleAddShare={handleAddShare}
                                  cupcakeCakeTypeOptions={CUPCAKE_CAKE_TYPE}
                                  selectedCupcakeCakeType={
                                    selectedCupcakeCakeType
                                  }
                                  setSelectedCupcakeCakeType={
                                    setSelectedCupcakeCakeType
                                  }
                                  ArrowRenderer={ArrowRenderer}
                                  ClearIcon={<CustomClearIcon />}
                                  ClearSelectedIcon={<CustomClearIcon />}
                                  overrideStrings={
                                    MULTISELECT_INTERNATIONALIZATION
                                  }
                                  cupcakeFodderOptions={CUPCAKE_FODDER}
                                  selectedCupcakeFodderType={
                                    selectedCupcakeFodderType
                                  }
                                  setSelectedCupcakeFodderType={
                                    setSelectedCupcakeFodderType
                                  }
                                  cupcakeToppingsOptions={CUPCAKE_TOPPINGS}
                                  selectedCupcakeToppingType={
                                    selectedCupcakeToppingType
                                  }
                                  setSelectedCupcakeToppingType={
                                    setSelectedCupcakeToppingType
                                  }
                                  cupcakeCreamColorOptions={CUPCAKE_CREAM_COLOR}
                                  selectedCupcakeCreamColorType={
                                    selectedCupcakeCreamColorType
                                  }
                                  setSelectedCupcakeCreamColorType={
                                    setSelectedCupcakeCreamColorType
                                  }
                                />
                              )}
                              {selectedType.name === 'Brownie' && (
                                <Brownie
                                  overrideStrings={
                                    MULTISELECT_INTERNATIONALIZATION
                                  }
                                  ArrowRenderer={ArrowRenderer}
                                  ClearIcon={<CustomClearIcon />}
                                  ClearSelectedIcon={<CustomClearIcon />}
                                  brownieToppingsOptions={BROWNIE_TOPPINGS}
                                  selectedBrownieToppingType={
                                    selectedBrownieToppingType
                                  }
                                  setSelectedBrownieToppingType={
                                    setSelectedBrownieToppingType
                                  }
                                />
                              )}
                              {selectedType.name === 'Macaron' && (
                                <Macaron
                                  macaronSharesList={macaronSharesList}
                                  macaronSharesOptions={MACARON_SHARES}
                                  handleSelectedMacaronShare={
                                    handleSelectedMacaronShare
                                  }
                                  handleInputPriceShare={
                                    handleInputPriceShareMacaron
                                  }
                                  handleRemoveShare={handleRemoveMacaronShare}
                                  handleAddShare={handleAddMacaronShare}
                                  overrideStrings={
                                    MULTISELECT_INTERNATIONALIZATION
                                  }
                                  ArrowRenderer={ArrowRenderer}
                                  ClearIcon={<CustomClearIcon />}
                                  ClearSelectedIcon={<CustomClearIcon />}
                                  macaronShellColorOptions={MACARON_SHELL_COLOR}
                                  selectedMacaronShellColorType={
                                    selectedMacaronShellColorType
                                  }
                                  setSelectedMacaronShellColorType={
                                    setSelectedMacaronShellColorType
                                  }
                                  macaronFodderOptions={MACARON_FODDER}
                                  selectedMacaronFodderType={
                                    selectedMacaronFodderType
                                  }
                                  setSelectedMacaronFodderType={
                                    setSelectedMacaronFodderType
                                  }
                                />
                              )}
                              {(selectedType.name === 'Number Cake' ||
                                selectedType.name === 'Letter Cake') && (
                                <NumberLetterCake
                                  numberLetterCakeSharesList={
                                    numberLetterCakeShares
                                  }
                                  numberLetterCakeSharesOptions={
                                    NUMBER_LETTER_CAKE_SHARES
                                  }
                                  handleSelectedNumberLetterCakeShare={
                                    handleSelectedNumberLetterCakeShare
                                  }
                                  handleInputPriceShare={
                                    handleInputPriceShareNumberLetterCake
                                  }
                                  handleRemoveShare={
                                    handleRemoveNumberLetterCakeShare
                                  }
                                  handleAddShare={
                                    handleAddNumberLetterCakeShare
                                  }
                                  register={register}
                                  errors={errors}
                                  overrideStrings={
                                    MULTISELECT_INTERNATIONALIZATION
                                  }
                                  ArrowRenderer={ArrowRenderer}
                                  ClearIcon={<CustomClearIcon />}
                                  ClearSelectedIcon={<CustomClearIcon />}
                                  numberLetterCakeBiscuitTypeOptions={
                                    NUMBER_LETTER_CAKE_BISCUIT
                                  }
                                  selectedNumberLetterCakeBiscuitType={
                                    selectedNumberLetterCakeBiscuitType
                                  }
                                  setSelectedNumberLetterCakeBiscuitType={
                                    setSelectedNumberLetterCakeBiscuitType
                                  }
                                  numberLetterCakeCreamOptions={
                                    NUMBER_LETTER_CAKE_CREAM
                                  }
                                  selectedNumberLetterCakeCreamType={
                                    selectedNumberLetterCakeCreamType
                                  }
                                  setSelectedNumberLetterCakeCreamType={
                                    setSelectedNumberLetterCakeCreamType
                                  }
                                  numberLetterCakeToppingsOptions={
                                    NUMBER_LETTER_CAKE_TOPPINGS
                                  }
                                  selectedNumberLetterCakeToppingType={
                                    selectedNumberLetterCakeToppingType
                                  }
                                  setSelectedNumberLetterCakeToppingType={
                                    setSelectedNumberLetterCakeToppingType
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className='flex justify-end'>
                        <CustomButton
                          type='button'
                          onClick={() => history.push('/admin/products')}
                          customStyles='border border-blue-gray-400 text-blue-gray-700 bg-white hover:bg-blue-gray-50 w-max sm:text-sm mr-2'
                        >
                          Annuler
                        </CustomButton>
                        <CustomButton
                          type='submit'
                          loading={loadingUpdate}
                          loaderHeight={'h-4'}
                          loaderWidth={'h-4'}
                          customStyles='w-max border border-transparent text-white bg-rose-600 hover:bg-rose-700 sm:text-sm'
                        >
                          Enregistrer
                        </CustomButton>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>{' '}
        </>
      )}
    </div>
  );
};

export default ProductUpdate;

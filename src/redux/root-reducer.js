import { combineReducers } from 'redux';

import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/user/user.reducers';
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryUpdateReducer,
  categorySubcategoriesListReducer
} from './reducers/category/category.reducers';
import {
  subcategoryCreateReducer,
  subcategoryListReducer,
  subcategoryDeleteReducer,
  subcategoryDetailsReducer,
  subcategoryUpdateReducer,
} from './reducers/subcategory/subcategory.reducers';
import {
  productCreateReducer,
  productListReducer,
  productListRelatedReducer,
  productDeleteReducer,
  productDetailsReducer,
  productUpdateReducer,
  productSortNewReducer,
  productSortSoldReducer,
  productCreateReviewReducer
} from './reducers/product/product.reducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categorySubcategoriesList: categorySubcategoriesListReducer,
  subcategoryCreate: subcategoryCreateReducer,
  subcategoryList: subcategoryListReducer,
  subcategoryDelete: subcategoryDeleteReducer,
  subcategoryDetails: subcategoryDetailsReducer,
  subcategoryUpdate: subcategoryUpdateReducer,
  productCreate: productCreateReducer,
  productList: productListReducer,
  productListRelated: productListRelatedReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productSortNew: productSortNewReducer,
  productSortSold: productSortSoldReducer,
  productCreateReview: productCreateReviewReducer,
});

export default rootReducer;

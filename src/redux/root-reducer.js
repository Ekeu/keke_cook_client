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
} from './reducers/category/category.reducers';
import {
  subcategoryCreateReducer,
  subcategoryListReducer,
  subcategoryDeleteReducer,
  subcategoryDetailsReducer,
  subcategoryUpdateReducer,
} from './reducers/subcategory/subcategory.reducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  subcategoryCreate: subcategoryCreateReducer,
  subcategoryList: subcategoryListReducer,
  subcategoryDelete: subcategoryDeleteReducer,
  subcategoryDetails: subcategoryDetailsReducer,
  subcategoryUpdate: subcategoryUpdateReducer,
});

export default rootReducer;

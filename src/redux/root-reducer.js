import { combineReducers } from 'redux';

import { userLoginReducer, userRegisterReducer } from './reducers/user/user.reducers';
import { categoryCreateReducer, categoryListReducer } from './reducers/category/category.reducers';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    categoryCreate: categoryCreateReducer,
    categoryList: categoryListReducer,
});

export default rootReducer;

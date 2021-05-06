import { combineReducers } from 'redux';

import { userLoginReducer, userRegisterReducer } from './reducers/user/user.reducers';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

export default rootReducer;

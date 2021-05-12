import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoadRedirect from '../private-routes/load-redirect.component'

const UserRoute = ({ children, ...rest }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    return userInfo?.token ? <Route {...rest} /> : <LoadRedirect/>
}

export default UserRoute

import { useDispatch } from 'react-redux'
import { RouteProps, Route, Redirect, useLocation } from 'react-router-dom'
import { isLogin } from '@/utils'
import { Logout } from '@/store/actions/login'
import { AppThunkDispatch } from '@/types/store'
import React from 'react'
export const AuthRoute = ({ children, ...rest }: RouteProps) => {
  const location = useLocation()
  const dispatch = useDispatch<AppThunkDispatch>()

  return (
    <Route
      {...rest}
      render={() => {
        const isAuth = isLogin()
        if (isAuth) {
          // React.ReactNode Represents the type of all content that can be rendered in React
          return children as React.ReactNode
        }
        dispatch(Logout())
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location.pathname,
              },
            }}
          />
        )
      }}
    />
  )
}

import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

export const KeepAlive = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      children={(props) => {
        const isMatch = props.match !== null
        const renderChildren = children as React.ReactNode
        return (
          <div
            style={{
              height: '100%',
              display: isMatch ? 'block' : 'none',
            }}
          >
            {renderChildren}
          </div>
        )
      }}
    ></Route>
  )
}

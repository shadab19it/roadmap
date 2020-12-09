import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../services/AuthService";

const ProtectedRoute: FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: "/signup", state: { from: props.location } }} />
      }
    />
  );
};

export default ProtectedRoute;

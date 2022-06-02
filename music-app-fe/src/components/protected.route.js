import React from "react";
import { Navigate } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({
  children,...rest
}) => {
   console.log(auth.isAuthenticated());
        return auth.isAuthenticated()? 
           children:
           (
            <Navigate
              to={{
                pathname: "/Login",
                state: {
                  from: rest.location
                }
              }}
            />
          );
        
};

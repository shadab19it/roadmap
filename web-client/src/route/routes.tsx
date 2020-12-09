import React, { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import pages
import Roadmaps from "../pages/Roadmaps/Roadmaps";
import AddComments from "../pages/AddCommets/AddComments";
import AddFeatures from "../pages/AddFeatures/AddFeatures";
import LogIn from "../pages/Atuthentication/Login";
import SignUp from "../pages/Atuthentication/SignUp";
// method
import ProtectedRoute from "./helper/ProtectedRoute";
import { isAuthenticated, User } from "../services/AuthService";
import { UserContext } from "../context/userContext";
// main layout
import MainLayout from "../components/Layout/MainLayout";

const MyRouter: FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <MainLayout>
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/signup' component={SignUp} />
          <ProtectedRoute exact path='/' component={Roadmaps} />
          <ProtectedRoute exact path='/addcomment/:requestId/:authId' component={AddComments} />
          <ProtectedRoute exact path='/addfeature' component={AddFeatures} />
          <ProtectedRoute exact path='/addfeature/edit/:requestId' component={AddFeatures} />
        </MainLayout>
      </Switch>
    </Router>
  );
};

export default MyRouter;

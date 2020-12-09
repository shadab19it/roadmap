import React, { FC } from "react";
import "./Auth.scss";
import LoginImage from "../../assest/image/login.svg";
import AuthForm, { IValue } from "./Form";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { authenticate, AuthLogin, isAuthenticated } from "../../services/AuthService";

const LogIn: FC = () => {
  const history = useHistory();
  const onSubmit = (v: IValue) => {
    const userInfo = {
      email: v.email,
      password: v.password,
    };

    AuthLogin(userInfo, (r) => {
      authenticate(r, () => {
        history.push(`/`);
      });
    });
  };

  if (isAuthenticated()) {
    history.push("/");
  }

  return (
    <div className='form-wrapper'>
      <div className='form-container'>
        <div className='left-content'>
          <div className='signup-image'>
            <img src={LoginImage} alt='' />
          </div>
        </div>
        <div className='right-content'>
          <h2 className='title'>Log In</h2>
          <AuthForm onSubmit={onSubmit} formType='login' />
          <div className='create-text'>
            <h2>
              <span onClick={() => history.push("/signup")}> Create an Account </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

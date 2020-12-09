import React, { FC } from "react";
import "./Auth.scss";
import SignupImage from "../../assest/image/signup.svg";
import AuthForm, { IValue } from "./Form";
import { useHistory } from "react-router-dom";
import { AuthSignUp, isAuthenticated } from "../../services/AuthService";

const SignUp: FC = () => {
  const history = useHistory();
  const onSubmit = (v: IValue) => {
    const userInfo = {
      name: v.username,
      email: v.email,
      password: v.password,
    };

    AuthSignUp(userInfo, (r) => {
      history.push("/login");
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
            <img src={SignupImage} alt='' />
          </div>
        </div>
        <div className='right-content' style={{ marginTop: "-40px" }}>
          <h2 className='title' style={{ marginBottom: 0 }}>
            Sign Up
          </h2>
          <AuthForm formType='signup' onSubmit={onSubmit} />
          <div className='create-text'>
            <h2>
              Allready an Account , <span onClick={() => history.push("/login")}> Login</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

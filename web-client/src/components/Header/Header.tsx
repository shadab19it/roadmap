import { Avatar, Button } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import "./Header.scss";

import { isAuthenticated, User, UserLogOut } from "../../services/AuthService";

const Header: FC = () => {
  const history = useHistory();
  const user: User = isAuthenticated() ? isAuthenticated() : "";

  let profilePic = user.profile_image_path
    ? user.profile_image_path
    : "https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";

  const LogOut = () => {
    UserLogOut(() => {
      history.push("/login");
    });
  };

  return (
    <>
      <div className='header'>
        <div className='left__content'>
          {isAuthenticated() && (
            <>
              <Avatar src={profilePic} />
              <h2 onClick={() => history.push("/")}>{user.name.toUpperCase()}</h2>
            </>
          )}
        </div>
        <div className='right__content'>
          {!isAuthenticated() ? (
            <>
              <Button style={{ marginRight: "20px" }} onClick={() => history.push("/login")}>
                LogIn
              </Button>
              <Button type='primary' onClick={() => history.push("/signup")}>
                SignUp
              </Button>
            </>
          ) : (
            <Button onClick={LogOut}>Log out</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

import React, { FC } from "react";
import Header from "../Header/Header";
import "./MainLayout.scss";

const MainLayout: FC = ({ children }) => {
  return (
    <div className='main-wrapper'>
      <Header />
      <div className='page-content' style={{ marginTop: 60 }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

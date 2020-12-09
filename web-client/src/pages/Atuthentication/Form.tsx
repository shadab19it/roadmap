import React, { FC, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, FireFilled } from "@ant-design/icons";

export interface IValue {
  username: string;
  email: string;
  password: string;
  remember: string;
}

const AuthForm: FC<{ formType: string; onSubmit: (v: IValue) => void }> = ({ formType, onSubmit }) => {
  const onFinish = (values: IValue) => {
    onSubmit(values);
  };

  return (
    <div>
      <Form name='normal_login' className='login-form' size='large' initialValues={{}} onFinish={onFinish}>
        {formType === "signup" ? (
          <Form.Item name='username' rules={[{ required: true, message: "Please Enter your Username!" }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
        ) : (
          ""
        )}
        <Form.Item name='email' rules={[{ required: true, message: "Please Enter your Email!" }]}>
          <Input prefix={<MailOutlined className='site-form-item-icon' />} type='email' placeholder='Email' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: "Please Enter your Password!" }]}>
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
        </Form.Item>
        <Form.Item className='action'>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            {formType === "login" ? "Log In" : "Sign Up"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;

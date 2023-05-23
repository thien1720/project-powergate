import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Select, Form, Input } from 'antd';

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

function ForgotPass() {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, [])
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className={cx("form-login")}>
            <div className={cx("head-form")}>
                <img src="image/logo-pro.svg" alt="logo" />
                <h1>HR Management System</h1>
                <h1>Sign In</h1>
            </div>


            <Form

                name="normal_login"
                layout="vertical"
                className={cx("login-form")}
                // initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Your work email"
                    rules={[{ required: true, message: 'Please input your email!' },]}
                >
                    <Input

                        type="text"
                        className={cx("style-input")}
                        placeholder="Email" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={cx("btn-login")}>
                        Confirm & Send OTP
                    </Button>
                </Form.Item>

                <Link to="/">Back to Sing In</Link>
            </Form>
        </div>
    );
}

export default ForgotPass;
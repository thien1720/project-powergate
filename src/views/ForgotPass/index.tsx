import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Form, Input } from 'antd';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';
import { AppState } from '../../service/reducer';
import { toastMessageSuccess, toastMessageError } from '../../common/toastMe';

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

function ForgotPass() {
    const [, forceUpdate] = useState({});
    let navigate = useNavigate()
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    useEffect(() => {
        forceUpdate({});
    }, [])
    const onFinish = (values: any) => {
        async function handleFogotPass() {
            console.log('Received values of form: ', values);
            const forgotPass = await dispatch(fetchThunk(`${API_PATHS.grade}/forgot-password`, "post" , values));
            console.log(forgotPass);
            if(forgotPass.result) {
                toastMessageSuccess(forgotPass.message);
                navigate("/")
            }else{
                toastMessageError(forgotPass.message);

            }
        }
        handleFogotPass()
    };

    return (
        <div className={cx("form-login")}>
            <div className={cx("head-form")}>
                <img src="image/logo-pro.svg" alt="logo" />
                <h1>HR Management System</h1>
                <h1>Sign In</h1>
            </div>


            <Form
                layout="vertical"
                className={cx("login-form")}
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


                    <Button
                        type="primary"
                        htmlType="submit"
                        className={cx("btn-login")}>
                        Confirm & Send OTP
                    </Button>

                <Link to="/">Back to Sing In</Link>
            </Form>
        </div>
    );
}

export default ForgotPass;
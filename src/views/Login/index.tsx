import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Button, Select, Form, Input } from 'antd';
import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import { setAuthorization, setUserInfo, logout } from "../../service/redux/auth.login"
import { AppState } from '../../service/reducer';
import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';
import { toastMessageSuccess, toastMessageError } from '../../common/toastMe';

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

interface FormValues {
    username: string;
    password: string;
}

function Login() {
    const userD = useSelector((state: any) => state.authReduce)
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [inputValue, setValue] = useState<FormValues>({ username: '', password: '' });
    const [, forceUpdate] = useState({});
    const [searchParams] = useSearchParams({ 'auth/sign-in': '' });
    const { t } = useTranslation();
    let navigate = useNavigate()

    useEffect(() => {
        forceUpdate({});
    }, [])


    const onFinish = (values: any) => {
        async function singIn(values: any) {
            const json = await dispatch(fetchThunk(API_PATHS.signIn, "post", values))
            // toastMessage(json.result)
            if (json.result) {
                toastMessageSuccess(json.message)
            } else {
                toastMessageError(json.message)
            }
            if (json.result) {
                dispatch(setAuthorization(json.data.token))
                Cookies.set(ACCESS_TOKEN_KEY, `Bearer ${json.data.token}`, { expires: values ? 7 : undefined });
                const userDetails = await dispatch(fetchThunk(API_PATHS.userProfile, "get"))
                const userJSON = JSON.stringify({
                    id: userDetails.data.id,
                    username: userDetails.data.username,
                    email: userDetails.data.email,
                });
                // console.log(userJSON);
                localStorage.setItem("auth", userJSON)
                dispatch(setUserInfo(userDetails.data));
                // const employee =  await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/get-available-for-assign/${userDetails.data.id}`, "get"));
                // console.log(employee)
                navigate("/employee")
            }
            // console.log(json)
        }
        values.company_id = Number(values.company_id)
        singIn(values)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
                onFinishFailed={onFinishFailed}

            >
                <Form.Item
                    name="username"
                    label={t('Username')}
                    rules={[{
                        required: true,
                        message: 'Please input your Username!'
                    }]}
                    normalize={(value, prevVal, prevVals) => value.trim()}
                >
                    <Input
                        value={inputValue.username}
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{
                        required: true,
                        message: 'Please input your Password!'
                    },
                    { min: 8, max: 16, message: 'Username must be at least 8 characters long!' },
                    ]}

                    normalize={(value, prevVal, prevVals) => value.trim()}
                >
                    <Input.Password
                        value={inputValue.password}
                        size="large"
                
                        className={cx("style-input")}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    name="company_id"
                    label="Factory"
                    rules={[{ required: true, message: 'Please select a factory!' }]}

                >
                    <Select
                        size="large"
                        placeholder="Select Factory"
                        className={cx("style-select")}
                    >
                        <Select.Option
                            value="1"

                        >SBM</Select.Option>
                        <Select.Option value="2">DMF</Select.Option>

                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={cx("btn-login")}>
                        Sing In
                    </Button>
                </Form.Item>

                <Link to="/forgot">Forgot your password</Link>
            </Form>

        </div>
    );
}

export default Login;
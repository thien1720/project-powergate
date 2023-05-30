import { useState } from "react";
import {  Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Space, Modal } from 'antd';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { toastMessageSuccess, toastMessageError } from '../../common/toastMe';
import { setAuthorization, setUserInfo, logout } from "../../service/redux/auth.login"
import { AppState } from '../../service/reducer';

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

function Header() {

    const [userDetail, setUserDetail] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userJSON: string = localStorage.getItem('auth') || "";
    const ifUser = JSON.parse(userJSON);
    let navigate = useNavigate()
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // setIsModalOpen(false);
        dispatch(logout())
        localStorage.removeItem("auth")
        navigate("/")
        toastMessageSuccess("LogOut-Succes.")

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<div className={cx("header-employe")}>
        <Modal
            title="Do you wish to sign out?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={400}
            
            className={cx("module-logout")}
            footer={[
                <Button className={cx("custom-btn")} size="large" key="back" onClick={handleCancel}>
                    NO
                </Button>,
                <Button className={cx("custom-btn")} size="large" key="submit" type="primary" onClick={handleOk}>
                    YES
                </Button>

            ]}
        >

            <div className={cx("content-modal")}>
                {/* sjkdfjdkf */}
            </div>
        </Modal>

        <div className={cx("logo-employe")}>
            <Link to="/" >
                <img src="/image/logo-pro.svg" />
                <h1>HR Management System</h1>
            </Link>
        </div>
        <div className={cx("user-language")}>
            <div className="select-language">
                {/* <select className={cx("form-select")} aria-label="Default select example">
                    <option value="VI" data-thumbnail="/image/payroll-management.svg">
                        <img src="/image/payroll-management.svg" />
                        VI
                    </option>
                    <option value="EN" data-thumbnail="/image/payroll-management.svg">
                        <img src="/image/payroll-management.svg" />

                        EN</option>
                </select> */}
            </div>

            <div className={cx("info-user")}>
                <div className={cx("box-img")}
                    onClick={() => setUserDetail(!userDetail)}
                >
                    <img src="/image/user-management.svg" alt="image-user" />
                </div>
                {userDetail ?
                    <div className={cx("user-detail")}>
                        <div className={cx("head-detail")}>
                            <div className={cx("img-user-detail")}>
                                <img src="/image/user-management.svg" alt="img-user" />
                            </div>

                            <h4>{ifUser.username}</h4>
                        </div>
                        <div className={cx("description-user")}>
                            <p>Developer</p>
                            <p>Staff_id:</p>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button type="primary"
                                    block
                                    size="large"
                                    onClick={showModal}
                                >
                                    Sing Out
                                </Button>
                            </Space>
                            <Link to="/reset-password" >Reset Passrod</Link>
                        </div>
                    </div>

                    : <></>}
            </div>
        </div>


    </div>);
}

export default Header;
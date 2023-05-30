import { useState, useEffect, useCallback } from "react"
import { NavLink, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { EmployE } from '../../module/employee';
import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';
import { AppState } from '../../service/reducer';
import renderCustomLabel from "../CustomLabel/customLabel";

import { Select, Form, Input, DatePicker } from 'antd';
import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

export interface EmInfo {
    detailE?: any,
    onFinish: any,
    onFinishFailed: any,
}


function EmployInfomation() {
    let { id } = useParams()
    const { t } = useTranslation();
    const isEmployE = id ? true : false

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    return (<div className={cx("personal-infomation")}>
        <div className={cx("head-infomation")}>
            <h1>Personal Information</h1>
            <p>Required(<span>*</span>)</p>
        </div>

        <div className={cx("lay-out-e-info")}>

            <div className={cx("form-1")}>

                {isEmployE && <Form.Item
                    label={renderCustomLabel("NIK")}
                    name="staff_id"
                    className={cx("label-custom")}
                >
                    <Input
                        size="large"
                        disabled
                        type="text"
                        className={cx("style-input")}
                    />
                </Form.Item>}

                <Form.Item
                    className={cx("label-custom")}
                    label={renderCustomLabel(t("Name") , true)}
                    name="name"
                    rules={[{
                        required: true,
                        message: 'Please input your Username!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Name"
                    />
                </Form.Item>

                <Form.Item
                    name="gender"
                    className={cx("label-custom")}
                    label={renderCustomLabel(t("Gender") , true)}
                    rules={[{
                        required: true,
                        message: 'Please input your Gender!'
                    }]}

                >
                    <Select
                        size="large"
                        placeholder="Gender"
                        className={cx("style-select")}
                    >
                        <Select.Option value={0}>Female</Select.Option>
                        <Select.Option value={1}>Male</Select.Option>

                    </Select>
                </Form.Item>

                <Form.Item
                    name="dob"
                    className={cx("label-custom")}
                    label={renderCustomLabel(t("Date of birth") , true)}
                    rules={[{
                        required: true,
                        message: 'Please input your Place of birth!'
                    }]}
                >
                    <DatePicker
                        className={cx("style-datepick")}
                        format="YYYY-MM-DD"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="pob"
                    label={renderCustomLabel(t("Place of birth" ))}
                    className={cx("label-custom")}

                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Place of birth" />
                </Form.Item>

                <Form.Item
                    name="ktp_no"
                    className={cx("label-custom")}
                    label={renderCustomLabel("KTP No" , true)}
                    rules={[{
                        required: true,
                        message: 'Please input your KTP No!'
                    }]}
                >
                    <Input
                        size="large"
                        className={cx("style-input")}
                        placeholder="KTP No" />
                </Form.Item>


                <Form.Item
                    name="nc_id"
                    
                    className={cx("label-custom")}
                    label={renderCustomLabel(t("National Card ID") , true)}
                    rules={[{
                        required: true,
                        message: 'Please input your National Card ID!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="National Card ID" />
                </Form.Item>

                <Form.Item
                    className={cx("label-custom")}

                    name="home_address_1"
                    label={renderCustomLabel(t("HomeAddress1"))}
                    rules={[{
                        message: 'Please input your Home Address 1!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Home Address 1" />
                </Form.Item>

                <Form.Item
                    className={cx("label-custom")}
                    name="home_address_2"
                    label={renderCustomLabel(t("Home Address 2"))}
                    rules={[{
                        message: 'Please input your Home Address 2!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Home Address 2" />
                </Form.Item>

            </div>
            <div className={cx("form-2")}>

                <Form.Item
                    className={cx("label-custom")}
                    name="mobile_no"
                    label={renderCustomLabel(t("Mobile No"))}
                    rules={[{

                        message: 'Please input your Mobile No!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Mobile No" />
                </Form.Item>
                <Form.Item
                    className={cx("label-custom")}
                    name="tel_no"
                    label={renderCustomLabel(t("Tel No") )}
                    rules={[{

                        message: 'Please input your Tel No!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Tel No" />
                </Form.Item>

                <Form.Item
                    className={cx("label-custom")}

                    name="marriage_id"
                    label={renderCustomLabel(t("Marriage Status"))}
                >
                    <Select
                        size="large"
                        placeholder={renderCustomLabel("Marriage Status")}
                        className={cx("style-select")}
                    >
                        <Select.Option value={0}>N/A</Select.Option>
                        <Select.Option value={1}>Married with 1 kid</Select.Option>
                        <Select.Option value={2}>Single</Select.Option>
                        <Select.Option value={3}>Married</Select.Option>

                    </Select>
                </Form.Item>



                <Form.Item
                    className={cx("label-custom")}
                    name="bank_account_no"
                    label={renderCustomLabel(t("Bank Card No."))}
                    rules={[{
                        message: 'Please input your Bank Card No.!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Bank Card No." />
                </Form.Item>
                <Form.Item
                    className={cx("label-custom")}
                    name="bank_name"
                    label={renderCustomLabel(t("Bank Name"))}
                    rules={[{
                        message: 'Please input your Bank Name!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Bank Name" />
                </Form.Item>

                <Form.Item
                    className={cx("label-custom")}

                    name="family_card_number"
                    label={renderCustomLabel(t("Family Card Number"))}
                    rules={[{
                        message: 'Please input your Family Card Number!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Family Card Number" />
                </Form.Item>
                <Form.Item
                    className={cx("label-custom")}
                    name="safety_insurance_no"
                    label={renderCustomLabel(t("Safety Insurance No."))}
                    rules={[{
                        message: 'Please input your Safety Insurance No.!'
                    }]}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Safety Insurance No." />
                </Form.Item>
                <Form.Item
                    className={cx("label-custom")}
                    name="health_insurance_no"
                    label={renderCustomLabel(t("Health Insurance No."))}
                >
                    <Input
                        size="large"
                        type="text"
                        className={cx("style-input")}
                        placeholder="Health Insurance No." />
                </Form.Item>

            </div>
        </div>



    </div >);
}

export default EmployInfomation;

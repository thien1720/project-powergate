import { useState, useEffect, useCallback, useRef } from "react"
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Button, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FiAlertOctagon } from "react-icons/fi";
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Benefit } from "../../component/Other";
import { EmployE } from '../../module/employee';
import EmployInfomation from "../../component/EmployInfomation";
import ContactInfomation from "../../component/ContactInfomation";
import EmployDetail from "../../component/EmployDetail";
import SalaryWages from "../../component/SalaryWages";
import EmployOther from "../../component/Other";
import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';
import { AppState } from '../../service/reducer';
import { toastMessageSuccess, toastMessageError } from '../../common/toastMe';

import classNames from "classnames/bind"
import styles from "./style.module.scss";
import "./style.scss"
const cx = classNames.bind(styles);
const { TabPane } = Tabs;

export interface DataForm {
    id?: number,
    staff_id?: string,
    name: string,
    mother_name?: string,
    bank_account_no?: number,
    bank_name?: string,
    family_card_number?: number,
    company_id?: number,
    gender: number,
    home_address_1?: string,
    home_address_2?: string,
    dob: string,
    contract_start_date: string,
    pob?: string,
    nc_id: number,
    ktp_no?: number,
    mobile_no?: number,
    tel_no?: number,
    marriage_id?: number,
    safety_insurance_no?: number,
    health_insurance_no?: number,
    department_id?: number,
    position_id?: number,
    shift?: string,
    type: number,
    entitle_ot?: string,
    meal_allowance_paid?: string;
    operational_allowance_paid?: string,
    attendance_allowance_paid?: string,
    basic_salary: number,
    audit_salary: number,
    safety_insurance: number,
    health_insurance?: number,
    meal_allowance: number,
    grade_id?: number,
    remark?: string,
    account_user_id?: number,
    benefits?: Benefit[],
}


function EmployeeCreate() {
    const formRef = useRef<FormInstance>(null);
    let { id } = useParams()
    const isEmployE = id ? true : false
    const [form] = Form.useForm();
    const [isAdd, setIsAdd] = useState(true)
    const [isEmploy, setIsEmploy] = useState(false)
    const [isContact, setIsContact] = useState(false)

    let navigate = useNavigate()
    const [optionBenefit, setOptionBenefit] = useState<any>([])
    const [optionPosition, setOptionPosition] = useState<any>([])
    const [optionDefaultSalary, setDefaultSalary] = useState<any>([])
    const [optionDepartment, setDepartment] = useState<any>([])

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    function convert(dateObj: Date) {
        var date = new Date(dateObj),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    const onFinish = async (values: any) => {
        values.dob = convert(values.dob)
        if (values.benefits) {
            const newBenefits = values.benefits.map((bene: string) => {
                const ids = optionBenefit.find((option: any) => {
                    return bene == (option.name)
                })
                return ids.id
            })
            console.log(newBenefits)
            values.benefits = newBenefits
        }
        if (!values.basic_salary) {
            values.basic_salary = 0
        } else {
            values.basic_salary = values.basic_salary
        }
        if (!values.audit_salary) {
            values.audit_salary = 0
        } else {
            values.audit_salary = values.audit_salary
        }
        if (!values.safety_insurance) {
            values.safety_insurance = 0
        } else {
            values.safety_insurance = values.safety_insurance
        }
        if (!values.health_insurance) {
            values.health_insurance = 0
        } else {
            values.health_insurance = values.health_insurance
        }
        if (!values.meal_allowance) {
            values.meal_allowance = 0
        } else {
            values.meal_allowance = values.meal_allowance
        }

        values.contract_start_date = convert(values.contract_start_date)

        async function handeAddChanges(values: any) {
            const json = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/`, "post", values))
            console.log(json)
            if (json.result) {
                toastMessageSuccess("Update Success")
            } else {
                toastMessageError(json.message)
            }
            if (json.result) {
                navigate("/employee")

            }
        }
        console.log(values)
        handeAddChanges(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleTabChange = (activeKey: string) => {
        formRef.current?.validateFields().then(() => {
            console.log('Form is valid');
            // Do something when the form is valid
        }).catch((error: any) => {
            console.log('Form validation failed:', error);
            // Do something when the form is invalid

            if (error.errorFields && activeKey == "1") {
                setIsContact(true)
            }
            if (error.errorFields && activeKey == "2") {
                setIsEmploy(true)
            }
        });
    };

    useEffect(() => {
        const getEmployee = async () => {
            const benefit = await dispatch(fetchThunk(`${API_PATHS.grade}/benefit`, "get"));
            const position = await dispatch(fetchThunk(`${API_PATHS.grade}/position`, "get"));
            const defaultSalary = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/get-default-salary`, "get"));
            const departMement = await dispatch(fetchThunk(`${API_PATHS.grade}/department`, "get"));

            setDepartment(departMement.data)
            setDefaultSalary(defaultSalary.data)
            setOptionPosition(position.data)
            setOptionBenefit(benefit.data)

            form.setFieldsValue(defaultSalary.data);
        }
        getEmployee()
    }, [])

    const tabBarClassName = isEmploy ? 'custom-tab-bar warning-tabpane' : 'custom-tab-bar';

    return <div className={cx("employee-create-update")}>
        <div className={cx("map-page")}>
            <Link to="/">General</Link>
            <span>&gt;</span>
            <NavLink
                to="/employee"
                className={(nav) => cx("next-page", { active: nav.isActive })}
            >Employees Management</NavLink>
            <span>&gt;</span>
            <p className={cx("next-page")}>Edit employee</p>
        </div>
        <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            className={cx("box-employ-info")}
            initialValues={optionDefaultSalary}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <div className={cx("head-employ-search")}>
                <h1>Employee Management</h1>
                <div className={cx("search-employ")}>
                    <Form.Item>
                        <Button
                            disabled={isAdd}
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className={cx("btn-login")}
                        >
                            Add
                        </Button>
                    </Form.Item>
                </div>
            </div>

            <div className={cx("tab-ui")}>

                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    // className={tabBarClassName}
                    // tabBarClassName="custom-tab-bar"
                    onChange={handleTabChange}
                >
                    <TabPane
                        className={isEmploy ? "warning-tabpane" : ""}
                        key="1"
                        tab={
                            <Button
                                type="link"
                                // className={"custom-tab-button" ,(
                                //     isEmploy ? 'warming-btn' : '' )}
                            >
                                Employyee Infomation
                                {
                                    isEmploy
                                        ? <FiAlertOctagon className={cx("warning-infomation")} />
                                        : <></>
                                }
                            </Button>
                        }
                    >
                        <EmployInfomation onFinish={onFinish} onFinishFailed={onFinishFailed} />
                    </TabPane>

                    <TabPane
                        // className={isEmploy ? "warning-tabpane" : ""}
                        tab={
                            <Button
                                type="link"
                                className={"custom-tab-button"}
                            >
                                Contact Infomation
                                {
                                    isContact
                                        ? <FiAlertOctagon className={cx("warning-infomation")} />
                                        : <></>
                                }
                            </Button>
                        }

                        key="2">
                        <ContactInfomation />
                    </TabPane>
                    <TabPane
                        tab={
                            <Button type="link" className="custom-tab-button">
                                Employment Detail
                            </Button>
                        }

                        key="3">
                        <EmployDetail
                            departMement={optionDepartment}
                            position={optionPosition}

                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <Button type="link" className="custom-tab-button">
                                Salary & Wages
                            </Button>
                        }

                        key="4"
                    >
                        <SalaryWages
                            defaultSalary={optionDefaultSalary}
                        />
                    </TabPane>


                    <TabPane
                        tab={
                            <Button type="link" className="custom-tab-button">
                                Other
                            </Button>
                        }

                        key="5">
                        <EmployOther />
                    </TabPane>
                </Tabs>
            </div>
        </Form>
    </div>
}

export default EmployeeCreate;



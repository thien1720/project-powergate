import { useState, useEffect, useCallback } from "react"
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import dayjs from "dayjs";
import { Tabs, Button, Form, Input } from 'antd';

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
// const layout = {
//     labelCol: { span: 10 },
//     wrapperCol: { span: 16 },
// };

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


function EmployeeCreateOrUpdate() {
    let initialState: DataForm = {
        id: undefined,
        staff_id: undefined,
        name: '',
        mother_name: "",
        bank_account_no: 0,
        bank_name: "",
        family_card_number: 0,
        gender: 0,
        home_address_1: "",
        home_address_2: "",
        dob: "",
        contract_start_date: "",
        pob: "",
        nc_id: 0,
        ktp_no: 0,
        mobile_no: 0,
        tel_no: 0,
        marriage_id: 0,
        safety_insurance_no: 0,
        health_insurance_no: 0,
        department_id: 0,
        position_id: 0,
        shift: "",
        type: 0,
        entitle_ot: "",
        meal_allowance_paid: "",
        operational_allowance_paid: "",
        attendance_allowance_paid: "",
        basic_salary: 0,
        audit_salary: 0,
        safety_insurance: 0,
        health_insurance: 0,
        meal_allowance: 0,
        grade_id: 0,
        remark: "",
        account_user_id: 0,
        benefits: [],
    };
    const [form] = Form.useForm();
    let { id } = useParams()
    let navigate = useNavigate()

    const [detailE, setDetailE] = useState<DataForm>(initialState)
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
        console.log(values.dob)
        console.log(values.contract_start_date)
        values.dob = convert(values.dob)
        values.id = id
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
        if (values.contract_start_date == undefined) {
            values.contract_start_date = detailE.contract_start_date
        } else {
            values.contract_start_date = convert(values.contract_start_date)
        }
        if (!values.type) {
            values.type = detailE.type
        } else {
            values.type = values.type
        }
        async function handeAddChanges(values: any) {
            const json = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/${id}`, "put", values))
            console.log(json)
            if(json.result){
                toastMessageSuccess("Update Success")
            }else{
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


    useEffect(() => {
        const getEmployee = async () => {
            const employee = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/${id}`, "get"));
            const benefit = await dispatch(fetchThunk(`${API_PATHS.grade}/benefit`, "get"));
            const position = await dispatch(fetchThunk(`${API_PATHS.grade}/position`, "get"));
            const defaultSalary = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/get-default-salary`, "get"));
            const departMement = await dispatch(fetchThunk(`${API_PATHS.grade}/department`, "get"));

            employee.data.dob = dayjs(new Date(employee.data.dob))
            employee.data.contract_start_date = dayjs(new Date(employee.data.contract_start_date))
            employee.data.benefits = employee.data?.benefits.map((item: Benefit) => item.name)
            employee.data.type = Number(employee.data.type)

            setDetailE(employee.data)
            setDepartment(departMement.data)
            setDefaultSalary(defaultSalary.data)
            setOptionPosition(position.data)
            setOptionBenefit(benefit.data)
            form.setFieldsValue(employee.data);
        }
        getEmployee()


    }, [dispatch, id])


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
            // {...layout}
            layout="horizontal"
            className={cx("box-employ-info")}
            initialValues={detailE}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}

        >
            <div className={cx("head-employ-search")}>
                <h1>Employee Management</h1>
                <div className={cx("search-employ")}>
                    {/* <button className={cx("btn")} onClick={onFinish}>Add</button> */}
                    <Form.Item>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className={cx("btn-login")}
                        >
                            Save Change
                        </Button>
                    </Form.Item>
                </div>
            </div>

            <div className={cx("tab-ui")}>

                <Tabs defaultActiveKey="1" type="card"
                >
                    <TabPane
                        className={cx("")}
                        key="1"
                        tab={
                            <Button type="link" className="custom-tab-button">
                                Employyee Infomation
                            </Button>
                        }
                    >
                        <EmployInfomation detailE={detailE} onFinish={onFinish} onFinishFailed={onFinishFailed} />
                    </TabPane>

                    <TabPane
                        tab={
                            <Button type="link" className="custom-tab-button">
                                Contact Infomation
                            </Button>
                        }

                        key="2">
                        <ContactInfomation />
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
                                Other
                            </Button>
                        }

                        key="5">
                        <EmployOther benefits={detailE.benefits} />
                    </TabPane>
                </Tabs>
            </div>
        </Form>
    </div>
}

export default EmployeeCreateOrUpdate;


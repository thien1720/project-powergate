import { useState, useEffect, useCallback, useRef } from "react"
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Button, Form, Input } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FormInstance } from 'antd/lib/form';
import { FiAlertOctagon } from "react-icons/fi";
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import convert from "../../common/convertDate"
import { Benefit , DataForm } from "../../module/employee";
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



function EmployeeCreate() {
    const formRef = useRef<FormInstance>(null);
    let navigate = useNavigate()
    let { id } = useParams()
    const isEmployE = id ? true : false
    const [form] = Form.useForm();
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const [isAdd, setIsAdd] = useState(true)
    const [isEmploy, setIsEmploy] = useState(false)
    const [isContact, setIsContact] = useState(false)
    const [optionBenefit, setOptionBenefit] = useState<any>([])
    const [optionGrade, setOptionGrade] = useState<Benefit[]>([])
    const [optionPosition, setOptionPosition] = useState<any>([])
    const [optionDefaultSalary, setDefaultSalary] = useState<any>([])
    const [optionDepartment, setDepartment] = useState<any>([])
    const [deleteId, setDeleteId] = useState<[]>([])
    const [fileLists, setFileList] = useState<UploadFile[]>([])
    const [fileListContact, setFileListContact] = useState<any>([])


    const formData = new FormData();
    // formData.append('employee_id', String(id));
    fileLists.forEach((file) => {
        if (file.originFileObj) {
            console.log(file)
            formData.append('documents[]', file.originFileObj, file.name);
        }
    });
    if (deleteId.length) {
        deleteId.forEach((file) => {
            formData.append('deleted_ids[]', file);
        });
    }

    // form contact info
    const formContactInfo = new FormData();
    fileListContact.forEach((contact: any) => {

        if (contact.fileList) {
            formContactInfo.append("documents[]", contact.fileList[0].originFileObj);
            formContactInfo.append("names[]", contact.name);
            formContactInfo.append("contract_dates[]", contact.contract_date);
            formContactInfo.append("deleted_contracts[]", contact.deletedContracts);

        }
    })

    const onFinish = async (values: any) => {
        values.dob = convert(values.dob)
        if (values.benefits) {
            const newBenefits = values.benefits.map((bene: string) => {
                const ids = optionBenefit.find((option: any) => {
                    return bene == (option.name)
                })
                return ids.id
            })
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
            let uploadOther
            let uploadContact
            const json = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/`, "post", values))
            console.log(json)
            if (formData.get("documents[]") || formData.get("deleted_ids[]")) {
                formData.append('employee_id', String(json.data.id));
                uploadOther = await dispatch(fetchThunk(`${API_PATHS.grade}/employee-document/upload`,
                    "post",
                    formData,
                    "multipart/form-data")
                )
            }
            if (formContactInfo.get("documents[]") || formContactInfo.get("deleted_contracts[]")) {
                formContactInfo.append('employee_id', String(json.data.id));
                uploadContact = await dispatch(fetchThunk(`${API_PATHS.grade}/contract/save-multiple`,
                    "post",
                    formContactInfo,
                    "multipart/form-data")
                )
            }
            console.log(uploadContact)
            if (json.result) {
                toastMessageSuccess("Update Success")
            } else {
                toastMessageError(uploadOther.message)
            }
            if (json.result) {
                navigate("/employee")
            }
        }
        handeAddChanges(values)
    };

    const onFinishFailed = (error: any) => {
        console.log('Failed:', error);
        setIsAdd(false)

        const filErrorCon = error.errorFields.some((err: any) => {
            return err.name.toString() === "contract_start_date" || err.name.toString() === "type"
        })

        const filErrorEm = error.errorFields.some((err: any) => {
            return err.name.toString() === "name"
                || err.name.toString() === "gender"
                || err.name.toString() === "nc_id"
                || err.name.toString() === "ktp_no"
                || err.name.toString() === "nc_id"
        })

        if(filErrorCon){
            setIsContact(false)

        }
        if(filErrorEm){
            setIsEmploy(false)
        }
    };

    const handleTabChange = (activeKey: string) => {
        formRef.current?.validateFields().then((values) => {
            setIsEmploy(false)
            setIsContact(false)
            if(values.contract_start_date &&
                 values.type !== undefined && 
                 values.name && 
                 values.nc_id && 
                 values.ktp_no && 
                 values.gender !== undefined && 
                 values.dob)
            {
                setIsAdd(false)
            }
            console.log(values)
            // Do something when the form is valid
        }).catch((error: any) => {
            console.log(error)
            const filErrorCon = error.errorFields.some((err: any) => {
                return err.name.toString() === "contract_start_date" || err.name.toString() === "type"
            })

            const filErrorEm = error.errorFields.some((err: any) => {
                return err.name.toString() === "name"
                    || err.name.toString() === "gender"
                    || err.name.toString() === "nc_id"
                    || err.name.toString() === "ktp_no"
                    || err.name.toString() === "nc_id"
            })

            // check Employee
            if (error.errorFields && activeKey == "2" && filErrorEm) {
                // console.log("contract")
                setIsAdd(true)
                setIsEmploy(true)
                if (filErrorCon) {
                    // setIsEmploy(false)
                    console.log("contactset")
                    setIsContact(true)
                    return
                }
            } else if (filErrorCon) {
                setIsEmploy(false)
            }

            // check contact
            if (error.errorFields && activeKey == "1" && filErrorCon) {
                // console.log("employContact")
                setIsAdd(true)
                setIsContact(true)
                if (filErrorEm) {
                    setIsEmploy(true)
                    return
                }
                // setIsEmploy(true)
            } else if (filErrorEm) {
                setIsContact(false)
            }

            // check Employee Detail
            if (error.errorFields && activeKey === "3") {
                // console.log("detail")
                // console.log(filErrorEm)
                if (filErrorCon && filErrorEm) {
                    setIsContact(true)
                    setIsEmploy(true)
                    return
                }

                if (filErrorEm) {
                    setIsEmploy(true)
                    return
                }
                if (filErrorCon) {
                    setIsContact(true)
                    return
                }

            }
            // check Salary
            if (error.errorFields && activeKey == "4") {
                // console.log(filErrorEm)
                if (filErrorCon && filErrorEm) {
                    setIsContact(true)
                    setIsEmploy(true)
                    return
                }
                if (filErrorEm) {
                    setIsEmploy(true)
                    return
                }
                if (filErrorCon) {
                    setIsContact(true)
                    return

                }

            }

            // check other
            if (error.errorFields && activeKey == "5") {
                // console.log(filErrorEm)
                if (filErrorCon && filErrorEm) {
                    setIsContact(true)
                    setIsEmploy(true)
                    return
                }
                if (filErrorEm) {
                    setIsEmploy(true)
                    return
                }
                if (filErrorCon) {
                    setIsContact(true)
                    return
                }

            }
        });
    };

    useEffect(() => {
        const getEmployee = async () => {
            const benefit = await dispatch(fetchThunk(`${API_PATHS.grade}/benefit`, "get"));
            const grades = await dispatch(fetchThunk(`${API_PATHS.grade}/grade`, "get"));
            const position = await dispatch(fetchThunk(`${API_PATHS.grade}/position`, "get"));
            const defaultSalary = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/get-default-salary`, "get"));
            const departMement = await dispatch(fetchThunk(`${API_PATHS.grade}/department`, "get"));

            setDepartment(departMement.data)
            setDefaultSalary(defaultSalary.data)
            setOptionPosition(position.data)
            setOptionBenefit(benefit.data)
            setOptionGrade(grades.data)
            form.setFieldsValue(defaultSalary.data);
        }
        getEmployee()
    }, [])


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
                    onChange={handleTabChange}

                >
                    <TabPane
                        key="1"
                        tab={
                            <Button
                                type="link"
                                className={isEmploy ? "custom-tab-button warning-text" : "custom-tab-button nomal-btn"}
                            >
                                Employee Infomation
                                {isEmploy
                                    ? <FiAlertOctagon
                                        className={cx("warning-infomation")}
                                    />
                                    : <></>
                                }
                            </Button>
                        }
                    >
                        <EmployInfomation />
                    </TabPane>

                    <TabPane
                        tab={
                            <Button
                                type="link"
                                className={isContact ? "custom-tab-button warning-text" : "custom-tab-button nomal-btn"}
                            >
                                Contact Infomation
                                {isContact
                                    ? <FiAlertOctagon
                                        className={cx("warning-infomation")}
                                    />
                                    : <></>
                                }
                            </Button>
                        }

                        key="2">
                        <ContactInfomation
                            fileListContact={fileListContact}
                            setFileListContact={setFileListContact}
                        />
                    </TabPane>

                    <TabPane

                        tab={
                            <Button type="link" className="custom-tab-button nomal-btn">
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
                            <Button type="link" className="custom-tab-button nomal-btn">
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
                            <Button type="link" className="custom-tab-button nomal-btn">
                                Other
                            </Button>
                        }
                        key="5"
                    >
                        <EmployOther
                            fileLists={fileLists}
                            deleteId={deleteId}
                            setDeleteId={setDeleteId}
                            setFileList={setFileList}
                            optionGrade={optionGrade}
                            optionBenefit = {optionBenefit}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </Form>
    </div>
}

export default EmployeeCreate;



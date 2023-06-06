import { useState, useCallback, useEffect } from "react"
import { useDispatch, } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select, Form, Input, Upload, Table, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, } from 'antd/lib/upload';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete } from "react-icons/ai";
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { BeneGrade } from "../../module/employee";
import renderCustomLabel from "../CustomLabel/customLabel";
import { AppState } from '../../service/reducer';
import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';

import classNames from "classnames/bind"
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


import styles from "./style.module.scss";
const cx = classNames.bind(styles);
const { Option } = Select;
const { TextArea } = Input;


function EmployOther({ fileLists, setFileList, deleteId, setDeleteId, optionGrade }: any) {
    const [optionBenefit, setOptionBenefit] = useState<any>([])
    const [beneGrade, setBeneGrade] = useState<BeneGrade[]>([]);
    const { t } = useTranslation();
    let todayDate = new Date().toISOString().slice(0, 10);
    const newLists = fileLists.map((item: any, index: number) => {
        if (item.document) {
            const indexName = Number(item.document.indexOf(item.employee_id)) + `${item.employee_id}`.length + 1

            return { ...item, index: index, name: item.document.slice(indexName) }
        } else {
            return { ...item, index: index }
        }
    })

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const columns: ColumnsType<object> = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',

        },
        {
            title: 'Document Name',
            dataIndex: 'name' || "document",
            key: 'name',
            width: 500,
        },
        {
            title: 'Created At',
            dataIndex: '',
            key: 'uid',
            width: 500,
            render: (record?: string) => (
                <>
                    {todayDate}
                </>
            ),

        },
        {
            title: 'Action',
            dataIndex: 'address',
            key: 'type',
            width: 500,
            render: (_, record, index) => (<>

                <Space size="middle">

                    <AiOutlineDelete onClick={() => handeleDeleteFile(index)} className={cx("delete-file")} />
                </Space>

            </>
            ),
        },
    ];  
    const onGenderChangeGrade = (id: number) => {
        const getGrade = async () => {
            const benefitGrade = await dispatch(fetchThunk(`${API_PATHS.grade}/grade/${id}`, "get"));
            console.log(benefitGrade);
            setBeneGrade(benefitGrade.data.benefits)
        }
        getGrade()
    }

    const handleSelectChange = (value: string) => {
        console.log(value)
    };

    const handleBeforeUpload = (file: RcFile, fileList: RcFile[]) => {
        // Trả về false để ngăn chặn chức năng submit mặc định
        return false;
    };
    const handeleDeleteFile = (indexs: number) => {

        const fileList = fileLists.filter((item: RcFile, index: number) => index !== indexs);
        setFileList(fileList);
        const findId = fileLists.find((item: RcFile, index: number) => index == indexs);

        setDeleteId([...deleteId, findId.id])

    }

    const handeleChangeFile = ({ fileList }: { fileList: any }) => {
        setFileList([...fileList]);
    };


    useEffect(() => {
        const getGrade = async () => {
            const benefit = await dispatch(fetchThunk(`${API_PATHS.grade}/benefit`, "get"));

            setOptionBenefit(benefit.data)
        }
        getGrade()

    }, [])
    return (<div className={cx("employ-other")}>

        <div className={cx("head-infomation")}>
            <h1>Others</h1>
            <p>Required(<span>
                *
            </span>)</p>
        </div>

        <div className={cx("box-other")}>
            <div className={cx("form-other")}>
                <Form.Item
                    name="grade_id"
                    label={renderCustomLabel(t("Grade"))}
                >
                    <Select
                        size="large"
                        placeholder="Select a option "
                        // allowClear
                        onChange={onGenderChangeGrade}
                    >
                        {optionGrade.map((option: BeneGrade) => (
                            <Option key={option.id} value={option.id}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                    {beneGrade
                        ? beneGrade.map((value: BeneGrade) => {
                            return <small
                                key={value.name}
                                className={cx("grade-bene")}>
                                {value.name}
                            </small>

                        }
                        )
                        : <></>}
                </Form.Item>


                <Form.Item
                    name="benefits"
                    label={renderCustomLabel(t("Benefit"))}
                >
                    <Select
                        size="large"
                        mode="multiple"
                        allowClear
                        onChange={handleSelectChange}
                        options={optionBenefit.map((item: any) => (
                            { value: item.name, id: item.id }
                        ))}
                    >

                    </Select>
                </Form.Item>

                <Form.Item
                    label={renderCustomLabel(t("Remark"))}

                >

                    <TextArea
                        placeholder=" "
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                </Form.Item>

                <Form.Item
                    // name="HRM User Account"
                    label={renderCustomLabel(t("HRM User Account"))}
                >
                    <Select
                        size="large"
                        placeholder="HRM User Account"
                        // onChange={onGenderChange}
                        allowClear
                        disabled
                    >
                        <Option value="male">male</Option>

                    </Select>
                </Form.Item>
            </div>

            <div className={cx("box-upload")}>
                <div className={cx("head-upload")}>

                    <div className={cx("title-upload")}>
                        <p>Document</p>
                    </div>

                    <div className={cx("location")}>
                        <Upload
                            fileList={fileLists}
                            className={cx("upload")}
                            onChange={handeleChangeFile}
                            showUploadList={false}
                            beforeUpload={handleBeforeUpload}
                            multiple={true}
                            maxCount={10}
                        >
                            <p
                                className={cx("btn-upload-doc")}
                            >
                                <UploadOutlined />
                                Upload</p>
                        </Upload>
                    </div>
                </div>

                <div className={cx("table-list-doc")}>
                    <SimpleBar style={{ maxHeight: 500 }}>

                        <Table
                            dataSource={newLists}
                            columns={columns}
                            pagination={false}
                            scroll={{ x: true }}
                        />
                    </SimpleBar>
                </div>

            </div>

        </div>
    </div>);
}

export default EmployOther;

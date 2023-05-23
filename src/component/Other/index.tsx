import React, { useState, useCallback, useEffect } from "react"
import { NavLink, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Select, Form, Input, Upload, Table, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { AiOutlineDelete } from "react-icons/ai";
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
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

export interface Benefit {
    code?: string,
    company_id?: number,
    id?: number,
    name?: string,
    type?: number,
    value?: string
}

interface Other {
    benefits?: Benefit[]
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];

}

function EmployOther({ benefits = [] }: any) {
    const [optionGrade, setOptionGrade] = useState<Benefit[]>([])
    const [optionBenefit, setOptionBenefit] = useState<any>([])
    const [fileLists, setFileList] = useState<UploadFile[]>([])
    var todayDate = new Date().toISOString().slice(0, 10);

    console.log(fileLists)
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const columns: ColumnsType<object> = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',

        },
        {
            title: 'Document Name',
            dataIndex: 'name',
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
    const onGenderChangeGrade = (value: string) => {
        const getGrade = async () => {
            const benefit = await dispatch(fetchThunk(`${API_PATHS.grade}/grade?${value}`, "get"));
        }
        getGrade()
    }

    const handleSelectChange = (value: string) => {
        console.log(value)

    };

    const handleBeforeUpload = (file: RcFile, fileList: RcFile[]) => {
        // Xử lý logic trước khi upload file
        
        // Trả về false để ngăn chặn chức năng submit mặc định
        return false;
    };
    const handeleDeleteFile = (indexs: number) => {
        // console.log(fileList)
        const fileList = fileLists.filter((item, index) => index !== indexs);

        setFileList(fileList);
        // handeleChangeFile({fileList})
    }
    const onRemove = (file: any) => {
        console.log(file)
    }

    const handeleChangeFile = ({ fileList }: { fileList: any }) => {
        console.log(fileList);
        // if()
        setFileList([...fileList]);
    };


    useEffect(() => {
        const getGrade = async () => {
            const grades = await dispatch(fetchThunk(`${API_PATHS.grade}/grade`, "get"));
            const benefit = await dispatch(fetchThunk(`${API_PATHS.grade}/benefit`, "get"));
            setOptionGrade(grades.data)
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
                    label="Grade"
                >

                    <Select
                        size="large"
                        placeholder="Select a option "
                        onChange={onGenderChangeGrade}

                    >
                        {optionGrade.map((option) => (
                            <Option key={option.id} value={option.name}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="benefits"
                    label="Benefit"
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
                    label="Remark" >

                    <TextArea
                        placeholder=" "
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                </Form.Item>

                <Form.Item
                    // name="HRM User Account"
                    label="HRM User Account" >
                    <Select
                        size="large"

                        placeholder="HRM User Account"
                        // onChange={onGenderChange}
                        allowClear
                        disabled
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
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
                            // name="upload"
                            fileList={fileLists}
                            className={cx("upload")}
                            onChange={handeleChangeFile}
                            onRemove={onRemove}

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
                            dataSource={fileLists.map((item: any, index: number) => ({ ...item, index: index }))}
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
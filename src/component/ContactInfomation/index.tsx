import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { Button, Select, Form, Input, DatePicker, Upload, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import moment, { Moment } from 'moment';
import renderCustomLabel from "../../common/customLabel"
import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

function ContactInfomation() {
    let { id } = useParams()
    console.log(id)
    const isEmployE = id ? true : false
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'No',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contract Name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Sign Date',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const [form] = Form.useForm();

    const handleDateChange = (date: any | null, dateString: string) => {
        // Xử lý logic khi ngày thay đổi
        console.log(date); // date là đối tượng moment của ngày được chọn
        console.log(dateString); // dateString là chuỗi biểu diễn ngày được chọn

        form.setFieldsValue({ dateField: date }); // Set lại giá trị cho trường dateField trong Form
    };


    return (<div className={cx("contact-infomation")}>
        <div className={cx("head-infomation")}>
            <h1>Contac Information</h1>
            <p>Required(<span>
                *
            </span>)</p>
        </div>

        <div className={cx("box-confirm")}>
            <div className={cx("form-1")}>

                <Form.Item
                    name="contract_start_date"
                    className={cx("label-custom")}
                    label={renderCustomLabel("Date Start")}
                    rules={[{
                        required: true,
                        message: 'Please select date time'
                    }
                    ]}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        className={cx("style-datepick")}
                        
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="type"
                    className={cx("label-custom")}
                    label={renderCustomLabel("Employee Type")}
                    rules={[{
                        required: true,
                        message: 'Please select an option'
                    }]}
                >
                    <Select
                        disabled = {isEmployE}
                        size="large"
                        placeholder="Employee Type"
                    >
                        <Select.Option value={0}>Permanent</Select.Option>
                        <Select.Option value={1}>Part-time</Select.Option>
                        <Select.Option value={2}>Contract</Select.Option>

                    </Select>
                </Form.Item>

            </div>

            <div className={cx("box-contact")}>
                <div className={cx("form-1")}>
                    <div className={cx("title")}>
                        <p>CONTRACT:</p>
                    </div>

                    <Form.Item
                       
                        className={cx("label-custom")}
                        label={renderCustomLabel("Date of Start")}
                        rules={[{ required: true, message: 'Please select date time' }]}

                    >
                        <DatePicker
                            size="large"

                            className={cx("style-datepick")} />
                    </Form.Item>

                    <Form.Item
                        className={cx("label-custom")}
                        label={renderCustomLabel("Contract Name")}
                        rules={[{
                            required: true,
                            message: " "
                        }]}
                    >
                        <Input
                            size="large"
                            // disabled
                            defaultValue={"kdjfkdjf"}
                            type="text"
                            className={cx("style-input")}

                            placeholder="Contract Name" />
                    </Form.Item>
                </div>

                <div className={cx("btn-upload")}>
                    <Upload
                        name="upload"
                        className={cx("upload")}
                    >
                        <button
                            className={cx("btn-upload-img")}
                        >
                            <UploadOutlined />
                            Click to Upload</button>
                    </Upload>


                    <Button
                        type="primary"
                        htmlType="submit"
                        className={cx("btn-color-add")}
                    >
                        Add
                    </Button>

                </div>
            </div>

            <div className={cx("table-list-doc")}>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        </div>
    </div>);
}

export default ContactInfomation;

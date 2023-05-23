import { Button, Select, Form, Input, DatePicker, Checkbox } from 'antd';
import classNames from "classnames/bind"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import renderCustomLabel from '../../common/customLabel';
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

export interface EmDetail {
    departMement: any;
    position: any;
}

function EmployDetail(
    { departMement, position }: EmDetail
) {
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };


    return (<div className={cx("employee-detail")}>
        <div className={cx("head-infomation")}>
            <h1>Employment Details</h1>
            <p>
                Required(<span>*</span>)
            </p>
        </div>

        <div className={cx("box-detail")}>
            <Form.Item
                className={cx("label-custom")}
                label={"Department"}

            >
                <Select
                    className={cx("item-select")}
                    placeholder="Employee Type"
                    size="large"
                >
                    {departMement.map((option: any) => (
                        <Select.Option key={option.id} value={option.id}>
                            {option.name}
                        </Select.Option>
                    ))}

                </Select>

            </Form.Item>


            <Form.Item
                className={cx("label-custom")}
                label={"Position"}
            >
                <Select
                    className={cx("item-select")}
                    placeholder="Employee Type"
                    size="large"
                >
                    <Select.Option value={null}>N/A</Select.Option>
                    {position.map((option: any) => (
                        <Select.Option key={option.id} value={option.id}>
                            {option.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
            >
                <Checkbox onChange={onChange}>Entitled OT</Checkbox>;
            </Form.Item>

            <Form.Item
            // name="mealallowancepaid"
            >
                <Checkbox onChange={onChange}>Meal Allowance Paid</Checkbox>;
            </Form.Item>

            <Form.Item
            // name="operational"
            >
                <Checkbox onChange={onChange} disabled>Operational Allowance Paid</Checkbox>;
            </Form.Item>

            <Form.Item
            // name="attendance"
            >
                <Checkbox onChange={onChange} disabled>Attendance Allowance Paid</Checkbox>;
            </Form.Item>

            {/* </Form> */}
        </div>
    </div>);
}

export default EmployDetail;

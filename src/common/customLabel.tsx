import { FormItemProps } from 'antd/lib/form';

export default function renderCustomLabel(label : string){
    return <p>{label}<span>*</span></p>
}
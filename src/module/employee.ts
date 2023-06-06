
export interface EmployE{
    id: number;
    staff_id: string;
    name: string;
    bank_account_no : string |null;
    bank_name : string |null;
    family_card_number : string |null;
    gender : number;
    health_insurance: number;
    marriage_id: string | null;
    mother_name: string | null;
    home_address_1: string | null;
    home_address_2:string | null;
    dob: string | null;   
    pob : string | null;
    nc_id: string | null;
    department_id:string | null;
    audit_salary : number | null;
    basic_salary : number | null;
    contract_start_date: string | null;
    minimum_salary_used: string | null;
    position_id: string | null;
    type: string | null;
    meal_allowance: number | null;
    meal_allowance_paid: number | null;
    grade_id : number | null

}

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

export interface BeneGrade{
    id: number;
    name: string;
    type: number;
    company_id: number;
    code: string;
    value: string;
}

export interface PropTable {
    selectedRowKeys: number[],
    setSelectedRowKeys: any,
    selectedRows: EmployE[],
    setSelectedRows: any,
    loading: boolean
}
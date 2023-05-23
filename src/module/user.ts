export interface AuthToken {
    oken: string;
    // expiresIn: number;
    // tokenType: string;
}
export interface Company {
    id: number;
    full_name: string;
    name: string;
    address: string;
    prefix: string;
    tel_no: string;
    createdAt: string;
    updatedAt: string;
}

export interface Department{
    id: number;
    code: string;
    company_id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    gender: string;
    avatar: string;
    role_id: number;
    department: Department;
    department_id: number;
    company:Company;
    company_id: number;
    createdAt: string;
    updatedAt: string;
}

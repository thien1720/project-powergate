import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../module/user';
import { EmployE } from '../../module/employee';

export interface employeeDocument {
  data: EmployE[];
  loading: boolean;
  error: string | null;
}

export const addEmployeeDocment = createCustomAction('employee/addEmployeeDocument', (data: AuthToken) => ({
  data
}
));

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
  data,
}));

export const logout = createCustomAction('auth/logout');

const actions = { addEmployeeDocment, };

type Action = ActionType<typeof actions>;

export default function reducer(state: EmployE[] = [], action: Action) {
  switch (action.type) {
    case getType(addEmployeeDocment):
      return { ...state, data: action.data };
      ;
    default:
      return state;
  }
}

import { APIHost ,APIUrl } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIUrl}/auth`;
  } else if (service === APIService.protected) {
    return `${APIUrl}/protected`;
  } else if (service === APIService.public) {
    return `${APIUrl}`;
  } 
  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/api/v1/login`,
  userProfile: `${getBaseUrl(APIService.public)}/api/v1/user/detail`,
  employeeDocument: `${getBaseUrl(APIService.public)}/api/v1/employee`,
  grade: `${getBaseUrl(APIService.public)}/api/v1`,
};

// console.log(getBaseUrl(APIService.public))
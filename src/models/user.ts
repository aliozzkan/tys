export enum UserRoles {
  admin = 1,
  manager = 2,
  basic = 3
}

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  phone: string;
  isNotificationEnabled: boolean;
  isEmailEnabled: boolean;
  isActive: boolean;
  userRoleID: number;
  userRoleName: string;
  userTypes: UserType[];
  companyID: number;
  companyName: string;
  companyLogo: string;
  accessToken: string;
  tokenExpireDate: string;
}

interface UserType {
  id: number;
  name: string;
}



export default {}
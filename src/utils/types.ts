export interface permissionType {
  id: number;
  name: string;
  description: string;
  method: string;
  createdAt: string;
  updatedAt: string;
  organizationId: number;
  RolePermission: Object;
}

export type responseType = {
  status: boolean;
  message: string | string[];
  data?: any;
  count?: any;
  totalPages?: number;
  totalResults?: number;
  statistic?: any;
};

export type userCreateInput = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  middleName?: string;
  roleId: number;
  organizationId: number;
  warehouseId: number;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  address?: string;
  profiflePictureKey?: string;
  profilePictureUrl?: string;
};


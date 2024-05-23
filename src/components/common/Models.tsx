export interface User {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  id: string;
  isAdmin: boolean;
  name: string;
  profilePicture: string | null;
  updatedAt: string;
  password?: string;
}
  
export interface UserRole {
  roleName: string;
  roleId: string;
}
  
export interface UserObject {
  user: User;
  userRoles: UserRole[];
}

export interface Role {
  id: string;
  name: string;
}

export interface RolesResponse {
  role: Role,
  rolePermissions: PermissionRoleObject[];
}

export interface PermissionRoleObject {
  permissionId: number;
  action: string;
  tableName: string;
}

export interface CategoryObject {
  id: string;
  name: string;
}

export interface PermissionObject {
  id: number;
  action: string;
  tableName: string;
}

export interface RolePayload {
  name: string,
  permissions: number[]
}

export interface ProductEditObject {
  id: string;
  name: string;
  brand: string;
  price: number;
  barCode: string;
  description: string;
  quantity: number;
  discountValue: number;
  isDiscountPercentage: boolean;
  categoryId: string;
  category?: CategoryObject;
}

export interface ProductObject {
  name: string;
  brand: string;
  price: number;
  barCode: string;
  description: string;
  quantity: number;
  discountValue?: number;
  isDiscountPercentage: boolean;
  categoryId: string;
  category?: CategoryObject;
}
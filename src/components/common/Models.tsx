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
  product: any;
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
  images?: [];
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

export interface ContactObject {
  id?: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  email: string;
  linkGoogleMaps: string;
}

export interface PlanEditObject {
  id: string;
  name: string;
  priceMonth: number;
  priceYear: number;
  description: string;
  active: boolean;
  productIds: string[],
  products?: ProductEditObject[]
}

export interface PlanObject {
  name: string;
  priceMonth: number;
  priceYear: number;
  description: string;
  active: boolean;
}

export interface CustomerObject {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  address: string;
  password: string;
  profilePicture: string | File;
}

export interface ContactObject {
  name: string;
  address: string;
  phone: string;
  description: string;
  email: string;
  linkGoogleMaps: string;
}

export interface ProductCustomer {
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
  images: ImageObject[];
}

export interface ImageObject {
  id: string;
  imageUrl: string;
}

export interface PlanCustomer {
  id: string;
  name: string;
  priceMonth: number;
  priceYear: number;
  description: string;
  active: boolean;
  images: ImageObject[];
  productIds: string[],
  products?: ProductEditObject[];
}

export interface CartItem {
  quantity: number;
  productId: string;
}
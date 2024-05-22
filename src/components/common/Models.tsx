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
    rolePermission: string;
  }

  export interface CategoryObject {
    id: string;
    name: string;
  }
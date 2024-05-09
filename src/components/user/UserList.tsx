import { Col } from 'react-bootstrap';
import UserItem from './UserCard';
import React from 'react';

export interface User {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  id: string;
  isAdmin: boolean;
  name: string;
  profilePicture: string;
  updatedAt: string;
}

export interface UserRole {
  roleName: string;
  roleId: string;
}

export interface UserObject {
  user: User;
  userRoles: UserRole[];
}

export interface Props {
  userList: UserObject[];
}

export function UserList({ userList }: Props) {
  return (
    <React.Fragment>
      {userList.map((userObject: UserObject) => (
        <Col key={userObject.user.id}>
          <UserItem userObject={userObject}></UserItem>
        </Col>
      ))}
    </React.Fragment>
  );
}

import { Col } from 'react-bootstrap';
import UserCard from './UserCard';
import React from 'react';
import { UserObject } from '../../../../components/common/Models';

export interface Props {
  userList: UserObject[];
}

export function UserList({ userList }: Props) {
  return (
    <React.Fragment>
      {userList.map((userObject: UserObject) => (
        <Col key={userObject.user.id}>
          <UserCard userObject={userObject}></UserCard>
        </Col>
      ))}
    </React.Fragment>
  );
}

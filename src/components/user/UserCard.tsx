import { Card, CardHeader, CardImg } from 'react-bootstrap';
import '../../styles/users.css';
import { UserObject, UserRole } from './UserList';
import { userImageDefault } from '../../views/admin/users/userImageDefault';

export interface Props {
  userObject: UserObject;
}

function UserCard({ userObject }: Props) {
  const userRoles = userObject.userRoles
    .map((role: UserRole) => role.roleName)
    .join(' | ');

  return (
    <Card key={userObject.user.id} className="user-card m-4">
      <CardHeader className="user-card-header">
        <CardImg
          src={userImageDefault}
          alt={userObject.user.name}
          height="100px"
          style={{ objectFit: 'none' }}
        ></CardImg>
      </CardHeader>
      <Card.Body>
        <Card.Title className="fw-bold">{userObject.user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{userRoles}</Card.Subtitle>
        <Card.Text>{userObject.user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
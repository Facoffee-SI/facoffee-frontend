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

  const profileImage = userObject.user.profilePicture 
    ?? userImageDefault;

  return (
    <Card key={userObject.user.id} className="user-card">
      <CardHeader className="user-card-header">
        <CardImg
          className="user-profile-picture"
          src={profileImage}
          alt={userObject.user.name}
        />
      </CardHeader>
      <Card.Body>
        <Card.Title className="fw-bold">{userObject.user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{userRoles}</Card.Subtitle>
        <Card.Text className="card-email">{userObject.user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;

import { Card, CardHeader, CardImg } from 'react-bootstrap';
import '../../../../styles/style.css';
import { UserObject, UserRole } from '../../../../components/common/Models';
import { userImageDefault } from '../../../../assets/userImageDefault';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';

export interface Props {
  userObject: UserObject;
}

function UserCard({ userObject }: Props) {
  const navigate = useNavigate();
  const userRoles = userObject.userRoles
    .map((role: UserRole) => role.roleName)
    .join(' | ');

  const profileImage = userObject.user.profilePicture 
    ? userObject.user.profilePicture
    : userImageDefault;

  const editUser = () => {
    return navigate(ROUTES.ADMIN_USERS_EDIT, { state: { userObject } });
  };

  const truncatedName = userObject.user.name.length > 15
  ? userObject.user.name.substring(0, 15) + "..."
  : userObject.user.name;


  return (
    <Card onClick={editUser} key={userObject.user.id} className="user-card">
      <CardHeader className="user-card-header">
        <CardImg
          className="user-profile-picture"
          src={profileImage}
          alt={userObject.user.name}
        />
      </CardHeader>
      <Card.Body>
        <Card.Title className="fw-bold">{truncatedName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{userRoles}</Card.Subtitle>
        <Card.Text className="card-email">{userObject.user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;

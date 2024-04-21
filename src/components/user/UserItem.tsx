import { Card, CardHeader, CardImg } from 'react-bootstrap';
import '../../styles/users.css';

type UserItemProps = {
  id: number;
  name: string;
  role: string;
  email: string;
  img: string;
};

export function UserItem({ id, name, role, email, img }: UserItemProps) {
  return (
    <Card key={id} className="user-item m-2">
      <CardHeader className="user-item-header">
        <CardImg
          src={img}
          alt={name}
          height="100px"
          style={{ objectFit: 'none' }}
        ></CardImg>
      </CardHeader>
      <Card.Body>
        <Card.Title className="fw-bold">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
        <Card.Text>{email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

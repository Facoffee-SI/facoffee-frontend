import { Row } from 'react-bootstrap';
import '../../../styles/style.css';
import * as ROUTES from '../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { UserList } from '../../../components/user/UserList';
import { UserObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import { useEffect, useState } from 'react';

const Users = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserObject[]>([]);

  const createUser = () => {
    return navigate(ROUTES.ADMIN_USERS_CREATE);
  };

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await api.get('user');
        const usersWithImages: UserObject[] = await Promise.all(response.data.map(async (user: UserObject) => {
          try {
            const imageResponse = await api.get(`/user/image/${user.user.id}`);
            if(imageResponse.data.data) {
              const uint8Array = new Uint8Array(imageResponse.data.data);
              const blob = new Blob([uint8Array], { type: 'image/jpeg' });
              const imageUrl = URL.createObjectURL(blob);
              user.user.profilePicture = imageUrl;
            }
            return user;
          } catch (error) {
            console.error('Error fetching image for user:', error);
            user.user.profilePicture = null;
            return user;
          }
        }));
        setUserList(usersWithImages);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUserList();
  }, []);

  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5">
        <div className="tertiary-container">
          <h3 className="text-center m-4">Usuários</h3>
          <div className="p-4">
            <div className="d-flex justify-content-end">
              <button
                className="btn bg-black text-white rounded p-2"
                onClick={createUser}
              >
                Criar novo usuário
              </button>
            </div>
            <div className='user-list-container'>
              <Row>
                <UserList userList={userList}></UserList>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;

import { Row } from 'react-bootstrap';
import '../../../styles/style.css';
import * as ROUTES from '../../../constants/routes';
import { UserList } from '../../../components/user/UserList';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/Api';

// const userList = await api.get('user').then((obj) => {
//   return obj.data;
// });

const Users = () => {
  const navigate = useNavigate();

  const createUser = () => {
    return navigate(ROUTES.ADMIN_USERS_CREATE);
  };

  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5">
        <div className="tertiary-container">
          <h3 className="text-center m-2">Usuários</h3>
          <div className="p-2">
            <div className="d-flex justify-content-end">
              <button
                className="btn bg-black text-white rounded p-1"
                onClick={createUser}
              >
                Criar novo usuário
              </button>
            </div>
            <Row md={2} xs={1} lg={4}>
              {/* <UserList userList={userList}></UserList> */}
            </Row>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;

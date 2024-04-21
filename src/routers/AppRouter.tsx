import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import SignIn from '../views/auth/signin';
import Users from '../views/admin/users';
import UsersEdit from '../views/admin/users/userEdit';
import * as ROUTES from '../constants/routes';

const AppRouter = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path={ROUTES.SIGNIN} element={<SignIn></SignIn>}></Route>
      <Route path={ROUTES.ADMIN_USERS} element={<Users></Users>}></Route>
      <Route
        path={ROUTES.ADMIN_USERS_EDIT}
        element={<UsersEdit></UsersEdit>}
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

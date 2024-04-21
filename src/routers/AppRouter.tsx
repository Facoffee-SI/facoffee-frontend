import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import SignIn from '../views/auth/signin';
import UserList from '../views/admin/user-list';
import * as ROUTES from '../constants/routes';

const AppRouter = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path={ROUTES.SIGNIN} element={<SignIn></SignIn>}></Route>
      <Route path={ROUTES.ADMIN_USERS} element={<UserList></UserList>}></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

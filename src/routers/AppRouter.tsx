import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import SignIn from '../views/auth/signin';
import Users from '../views/admin/users';
import EditUser from '../views/admin/users/editUser';
import CreateUser from '../views/admin/users/createUser';
import * as ROUTES from '../constants/routes';
import CreateProduct from '../views/app/product/createProduct';
import EditProduct from '../views/app/product/editProduct';
import CreatePlan from '../views/app/plan/createPlan';
import EditPlan from '../views/app/plan/editPlan';
import CreateContact from '../views/app/contact/createContact';
import EditContact from '../views/app/contact/editContact';

const AppRouter = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path={ROUTES.SIGNIN} element={<SignIn></SignIn>}></Route>
      <Route path={ROUTES.ADMIN_USERS} element={<Users></Users>}></Route>
      <Route
        path={ROUTES.ADMIN_USERS_EDIT}
        element={<EditUser></EditUser>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_USERS_CREATE}
        element={<CreateUser></CreateUser>}
      ></Route>
       <Route
        path={ROUTES.ADMIN_PRODUCT_ADD}
        element={<CreateProduct></CreateProduct>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_PRODUCT_EDIT}
        element={<EditProduct></EditProduct>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_PLAN_ADD}
        element={<CreatePlan></CreatePlan>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_PLAN_EDIT}
        element={<EditPlan></EditPlan>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_CONTACT_ADD}
        element={<CreateContact></CreateContact>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_CONTACT_EDIT}
        element={<EditContact></EditContact>}
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

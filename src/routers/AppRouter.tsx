import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import SignIn from '../views/auth/signIn';
import Users from '../views/admin/users/listUser';
import EditUser from '../views/admin/users/editUser';
import CreateUser from '../views/admin/users/createUser';
import * as ROUTES from '../constants/routes';
import CreateProduct from '../views/admin/product/createProduct';
import EditProduct from '../views/admin/product/editProduct';
import CreatePlan from '../views/admin/plan/createPlan';
import EditPlan from '../views/admin/plan/editPlan';
import CreateContact from '../views/admin/contact/createContact';
import EditContact from '../views/admin/contact/editContact';
import Categories from '../views/admin/categories/listCategories';
import CreateCategory from '../views/admin/categories/createCategory';

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
      <Route
        path={ROUTES.ADMIN_CATEGORIES}
        element={<Categories></Categories>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_CATEGORY_ADD}
        element={<CreateCategory></CreateCategory>}
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import AdminLogin from '../views/admin/user/loginUser';
import Users from '../views/admin/user/listUser';
import EditUser from '../views/admin/user/editUser';
import CreateUser from '../views/admin/user/createUser';
import * as ROUTES from '../constants/routes';
import CreateProduct from '../views/admin/product/createProduct';
import EditProduct from '../views/admin/product/editProduct';
import CreatePlan from '../views/admin/plan/createPlan';
import EditPlan from '../views/admin/plan/editPlan';
import CreateContact from '../views/admin/contact/createContact';
import EditContact from '../views/admin/contact/editContact';
import Categories from '../views/admin/category/listCategories';
import CreateCategory from '../views/admin/category/createCategory';
import Roles from '../views/admin/role/listRoles';
import CreateRole from '../views/admin/role/createRole';
import Products from '../views/admin/product/listProduct';
import Plans from '../views/admin/plan/listPlan';
import CreateAbout from '../views/admin/about/createAbout';
import EditAbout from '../views/admin/about/editAbout';

const AppRouter = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin></AdminLogin>}></Route>
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
        path={ROUTES.ADMIN_PRODUCTS}
        element={<Products></Products>}
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
        path={ROUTES.ADMIN_PLANS}
        element={<Plans></Plans>}
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
      <Route
        path={ROUTES.ADMIN_ROLES}
        element={<Roles></Roles>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_ROLE_ADD}
        element={<CreateRole></CreateRole>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_ABOUT_ADD}
        element={<CreateAbout></CreateAbout>}
      ></Route>
      <Route
        path={ROUTES.ADMIN_ABOUT_EDIT}
        element={<EditAbout></EditAbout>}
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

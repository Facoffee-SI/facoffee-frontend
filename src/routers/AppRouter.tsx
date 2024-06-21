import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import AdminNavigation from '../components/common/AdminNavigation';
import AdminLogin from '../views/admin/user/loginUser';
import Users from '../views/admin/user/listUser';
import EditUser from '../views/admin/user/editUser';
import CreateUser from '../views/admin/user/createUser';
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
import CustomerLogin from '../views/customer/customer/loginCustomer';
import RegisterCustomer from '../views/customer/customer/register';
import CustomerNavigation from '../components/common/CustomerNavigation';
import EditCustomer from '../views/customer/customer/editCustomer';
import AboutInfo from '../views/customer/about/about';
import ContactInfo from '../views/customer/contact/contact';
import ProductsCustomer from '../views/customer/product/listProducts';
import ProductPage from '../views/customer/product/detailProduct';
import PlansCustomer from '../views/customer/plan/listPlans';
import PlanPage from '../views/customer/plan/detailPlan';
import CartCustomer from '../views/customer/cart/cartCustomer';
import PrivateRoute from '../components/common/PrivateRoute';

const AppRouter = () => {
  const token = localStorage.getItem('token');
  const tokenCustomer = localStorage.getItem('tokenCustomer');
  useEffect(() => {}, [token, tokenCustomer]);

  return (
    <BrowserRouter>
      {token ? <AdminNavigation /> : <CustomerNavigation />}
      <Routes>
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={ROUTES.ADMIN_USERS} element={
          <PrivateRoute customer={false}>
            <Users />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_USERS_EDIT} element={
          <PrivateRoute customer={false}>
            <EditUser />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_USERS_CREATE} element={
          <PrivateRoute customer={false}>
            <CreateUser />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_PRODUCTS} element={
          <PrivateRoute customer={false}>
            <Products />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_PRODUCT_ADD} element={
          <PrivateRoute customer={false}>
            <CreateProduct />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_PRODUCT_EDIT} element={
          <PrivateRoute customer={false}>
            <EditProduct />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_PLANS} element={
          <PrivateRoute customer={false}>
            <Plans />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_PLAN_ADD} element={
          <PrivateRoute customer={false}>
            <CreatePlan />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_PLAN_EDIT} element={
          <PrivateRoute customer={false}>
            <EditPlan />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_CONTACT_ADD} element={
          <PrivateRoute customer={false}>
            <CreateContact />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_CONTACT_EDIT} element={
          <PrivateRoute customer={false}>
            <EditContact />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_CATEGORIES} element={
          <PrivateRoute customer={false}>
            <Categories />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_CATEGORY_ADD} element={
          <PrivateRoute customer={false}>
            <CreateCategory />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_ROLES} element={
          <PrivateRoute customer={false}>
            <Roles />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_ROLE_ADD} element={
          <PrivateRoute customer={false}>
            <CreateRole />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_ABOUT_ADD} element={
          <PrivateRoute customer={false}>
            <CreateAbout />
          </PrivateRoute>
        } />
        <Route path={ROUTES.ADMIN_ABOUT_EDIT} element={
          <PrivateRoute customer={false}>
            <EditAbout />
          </PrivateRoute>
        } />
        <Route path={ROUTES.CUSTOMER_LOGIN} element={<CustomerLogin />} />
        <Route path={ROUTES.CUSTOMER_ABOUT} element={<AboutInfo />} />
        <Route path={ROUTES.CUSTOMER_CONTACT} element={<ContactInfo /> } />
        <Route path={ROUTES.HOME} element={<CustomerLogin />} />
        <Route path={ROUTES.CUSTOMER_REGISTER} element={<RegisterCustomer />} />
        <Route path={ROUTES.CUSTOMER_EDIT} element={
          <PrivateRoute customer={true}>
            <EditCustomer />
          </PrivateRoute>
        } />
        <Route path={ROUTES.CUSTOMER_PRODUCTS} element={
          <PrivateRoute customer={true}>
            <ProductsCustomer />
          </PrivateRoute>
        } />
        <Route path={ROUTES.CUSTOMER_PRODUCT} element={
          <PrivateRoute customer={true}>
            <ProductPage />
          </PrivateRoute>
        } />
        <Route path={ROUTES.CUSTOMER_PLANS} element={
          <PrivateRoute customer={true}>
            <PlansCustomer />
          </PrivateRoute>
        } />
        <Route path={ROUTES.CUSTOMER_PLAN} element={
          <PrivateRoute customer={true}>
            <PlanPage />
          </PrivateRoute>
        } />
        <Route path={ROUTES.CUSTOMER_CART} element={
          <PrivateRoute customer={true}>
            <CartCustomer />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import { useNavigate } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { useEffect } from "react";

const PrivateRoute = ({ children, customer }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = customer ? localStorage.getItem('tokenCustomer') : localStorage.getItem('token');

    if (!token) {
      navigate(customer ? ROUTES.CUSTOMER_LOGIN : ROUTES.ADMIN_LOGIN, { replace: true });
    }
  }, [customer, navigate]);

  return children; 
};

export default PrivateRoute;
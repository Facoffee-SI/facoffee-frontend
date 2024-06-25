import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import 'react-toastify/dist/ReactToastify.css';

const PostCartCustomer = () => {
  return (
    <>
      <main className="primary-container p-3 d-flex justify-content-center align-items-center">
        <div className="card p-5" style={{ maxWidth: '45.75rem', backgroundColor: '#F4F4F4' }}>
          <h4 className="text-center">Pedido realizado com sucesso.</h4>
          <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
            <Link
              className="btn bg-black text-white rounded p-2"
              style={{ width: '300px' }}
              to={ROUTES.CUSTOMER_PRODUCTS}
            >
              <span style={{ marginRight: '6px'}}>⬅️</span>Continuar comprando
            </Link>
            <Link
              className="btn bg-black text-white rounded p-2"
              style={{ width: '300px', marginLeft: '30px' }}
              to={ROUTES.CUSTOMER_ORDERS}
            >
              Meus pedidos
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostCartCustomer;

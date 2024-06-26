import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import 'react-toastify/dist/ReactToastify.css';

const PostSubscriptionPlan = () => {
  return (
    <>
      <main className="primary-container p-3 d-flex justify-content-center align-items-center">
        <div className="card p-5" style={{ maxWidth: '45.75rem', backgroundColor: '#F4F4F4' }}>
          <h4 className="text-center">Assinatura realizada com sucesso.</h4>
          <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
            <Link
              className="btn bg-black text-white rounded p-2"
              style={{ width: '350px' }}
              to={ROUTES.CUSTOMER_PRODUCTS}
            >
              <span style={{ marginRight: '6px'}}>⬅️</span>Continuar comprando
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostSubscriptionPlan;

import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { useEffect, useState } from 'react';
import Loading from '../../../components/common/Loading';
import { PlanCustomer, SubscriptionObject } from '../../../components/common/Models';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../services/Api';
import ProgressTrackerPlan from './components/ProgressTrackerPlan';

const planCustomer = {
  id: '',
  name: '',
  priceMonth: 0,
  priceYear: 0,
  description: '',
  active: true,
  images: [],
  productIds: []
}

const ConfirmSubscriptionPlan = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PlanCustomer>(planCustomer);
  const [subscription, setSubscription] = useState<SubscriptionObject>();
  const planId: string | null = location.state?.planId;

  useEffect(() => {
    setLoading(true);
    const fetchPlan = async () => {
      try {
        const response = await api.get(`plan/customer/${planId}`);
        setPlan(response.data);
      } catch (error) {
        toast.error('Erro ao buscar plano. Por favor, tente novamente mais tarde.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('Erro ao buscar plano', error);
      }
    };

    const fetchSubscription = async () => {
      try {
        const response: { data: SubscriptionObject } = await api.get(`customer/subscription`);
        if (response.data) {
          setSubscription(response.data);
        }
      } catch (error) {
        console.log('Erro ao buscar assinatura', error);
      }
    };

    fetchPlan();
    fetchSubscription();
    setLoading(false);
  }, [planId]);

  if (!planId) {
    navigate(ROUTES.CUSTOMER_PLANS);
  }

  const finalizeSubscription = (yearly: boolean) => {
    return navigate(ROUTES.CUSTOMER_SUBSCRIPTION_FINALIZE, { state: { planId: plan.id, yearly } });
  }

  if (loading) {
    return <Loading />;
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calculateDiscount = () => {
    return (plan.priceMonth*12) - plan.priceYear;
  }; 

  const priceMonth = formatPrice(plan.priceMonth);
  const priceYear = formatPrice(plan.priceYear);
  const discount = formatPrice(calculateDiscount());


  return (
    <>
      <ToastContainer />
      <main className="primary-container p-3 d-flex justify-content-center align-items-center">
        <div className="card p-5" style={{ maxWidth: '30.75rem'}}>
          {subscription ? (
            <>
              <h5 className="text-center">Cancele sua assinatura atual para assinar outro plano.</h5>
              <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
                <Link
                  className="btn bg-black text-white rounded p-2"
                  style={{ width: '350px' }}
                  to={ROUTES.CUSTOMER_PLANS}
                >
                  <span style={{ marginRight: '6px'}}>⬅️</span>Voltar
                </Link>
              </div>
            </>
          ): (
            <>
              <ProgressTrackerPlan currentStep={1} />
              <div className="section-cart border p-3" style={{ height: '100%' }}>
                <h4 className="text-center mb-3">Assinatura de Plano</h4>
                  <div className="total-p">
                    <span className="span-title">Preço Mensal</span>
                    <span>{priceMonth}</span>
                  </div>
                  <div className="total-p">
                    <span className="span-title">Preço Anual</span>
                    <span>{priceYear}</span>
                  </div>
                  {calculateDiscount() > 0 ? (
                    <div className="total-p">
                      <span className="span-title">Desconto Anual</span>
                      <span>{discount}</span>
                    </div>
                  ) : null}
                  <hr />
                  <div className="total-p">
                    <span className="total-text">Total</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="buttons-plan">
                    <button
                      className="btn bg-black text-white rounded p-2 mt-2 btn-plan"
                      onClick={() => finalizeSubscription(false)}
                    >
                      Mensal
                    </button>
                    <button
                      className="btn bg-success text-white rounded p-2 mt-2 btn-plan"
                      onClick={() => finalizeSubscription(true)}
                    >
                      Anual
                    </button>
                  </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default ConfirmSubscriptionPlan;

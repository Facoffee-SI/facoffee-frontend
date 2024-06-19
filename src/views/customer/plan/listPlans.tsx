import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/common/Loading';
import { PlanCustomer } from '../../../components/common/Models';
import api from '../../../services/Api';
import { PlanList } from './components/PlanList';
import './style.css';

const PlansCustomer = () => {
  const [planList, setPlansList] = useState<PlanCustomer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get(`/plan/customer`);
        setPlansList(response.data);
      } catch (error) {
        toast.error('Erro ao buscar planos. Por favor, tente novamente mais tarde.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('Erro ao buscar planos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <main className="primary-container p-5">
          <div className="secondary-container p-5" style={{ maxWidth: '80.75rem' }}>
            <div className="tertiary-container">
              <h3 className="text-center m-4">Planos</h3>
              {planList.length ? (
                <PlanList planList={planList} />
              ) : (
                <div className="text-center p-4">Não existem planos disponíveis.</div>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PlansCustomer;

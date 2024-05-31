import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../styles/style.css';
import { useNavigate } from 'react-router-dom';
import { PlanEditObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import * as ROUTES from '../../../constants/routes';
import './styles.css'
import PlanCard from './PlanCard';

const Plans = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState<PlanEditObject[]>([]);
  
    const createPlan = () => {
      navigate(ROUTES.ADMIN_PLAN_ADD);
    };
  
    const fetchPlans = async () => {
      try {
        const response = await api.get('plan');
        setPlans(response.data);
      } catch (error) {
        console.error('Erro ao buscar planos');
      }
    };
  
    useEffect(() => {
      fetchPlans();
    }, []);
  
    const handleRemovePlan = (planId: string) => {
      setPlans((prevPlans) =>
        prevPlans.filter((plan) => plan.id !== planId)
      );
    };

  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <div className="tertiary-container">
          <h3 className="text-center m-4">Planos</h3>
          <div className="p-4">
            <div className="d-flex justify-content-end">
              <Button
                className="btn bg-black text-white rounded p-2 mb-4"
                onClick={createPlan}
              >
                Criar novo plano
              </Button>
            </div>
            <div className="category-list-container">
              {plans.map((plan) => (
                <PlanCard
                key={plan.id}
                plan={plan} 
                onRemove={handleRemovePlan}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Plans;
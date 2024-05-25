import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { PlanEditObject } from '../../../components/common/Models';
import { ConfirmationModal } from '../../../components/common/ConfirmationModal';
import api from '../../../services/Api';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

interface PlanCardProps {
  plan: PlanEditObject;
  onRemove: (planId: string) => void;
}

const PlanCard = ({ plan, onRemove }: PlanCardProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    navigate(ROUTES.ADMIN_PLAN_EDIT, { state: { plan } });
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/plan/${plan.id}`);
      onRemove(plan.id);
    } catch (error) {
      console.error('Erro ao remover plano');
    }
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toString().replace('.', ',')}`;
  };

  return (
    <Col className="mb-3">
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRemove}
        text="Deseja realmente excluir o plano?"
      />
      <div className="card p-3 shadow">
        <Row>
          <Col xs={12} md={8}>
            <h5 className="card-title">{plan.name}</h5>
            <div className="d-flex">
              <p className="card-text mb-0 me-2">Preço: {formatPrice(plan.priceMonth)} (mensal) |</p>
              <p className="card-text mb-0">{formatPrice(plan.priceYear)} (anual)</p>
            </div>
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-end" style={{ height: '45px' }}>
            <Button variant="warning" onClick={handleEdit}>
              Editar
            </Button>
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Remover
            </Button>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default PlanCard;
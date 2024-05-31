import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ProductEditObject } from '../../../components/common/Models';
import { ConfirmationModal } from '../../../components/common/ConfirmationModal';
import api from '../../../services/Api';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

interface ProductCardProps {
  product: ProductEditObject;
  onRemove: (productId: string) => void;
}

const ProductCard = ({ product, onRemove }: ProductCardProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    navigate(ROUTES.ADMIN_PRODUCT_EDIT, { state: { product } });
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/product/${product.id}`);
      onRemove(product.id);
    } catch (error) {
      console.error('Erro ao remover produto');
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
        text="Deseja realmente excluir o produto?"
      />
      <div className="card p-3 shadow">
        <Row>
          <Col xs={12} md={8}>
            <h5 className="card-title">{product.name}</h5>
            <div className="d-flex">
              <p className="card-text mb-0 me-4">{product.category?.name}</p>
              <p className="card-text mb-0">{formatPrice(product.price)}</p>
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

export default ProductCard;
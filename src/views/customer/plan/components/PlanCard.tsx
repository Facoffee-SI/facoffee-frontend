import { Card, CardHeader, CardImg, CardBody, CardTitle, CardText, Button } from 'react-bootstrap';
import '../style.css';
import { PlanCustomer } from '../../../../components/common/Models';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import noImage from '../../../../assets/noImage.png';

export interface Props {
  planObject: PlanCustomer;
}

function PlanCard({ planObject }: Props) {
  const navigate = useNavigate();

  const productDetail = () => {
    return navigate(ROUTES.CUSTOMER_PLAN, { state: { planId: planObject.id } });
  };

  const confirmSubscription = () => {
    return navigate(ROUTES.CUSTOMER_SUBSCRIPTION, { state: { planId: planObject.id } });
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  const originalPriceMonth = formatPrice(planObject.priceMonth);
  const originalPriceYear = formatPrice(planObject.priceYear);

  return (
    <Card onClick={productDetail} className="product-card">
      <div className="d-flex flex-column h-100">
        <CardHeader className="product-card-header">
          <CardImg
            className="product-image"
            src={planObject.images[0] ? planObject.images[0].imageUrl : noImage}
            alt={planObject.name}
          />
        </CardHeader>
        <CardBody className="d-flex flex-column justify-content-between">
          <div>
            <CardTitle className="fw-bold product-card-title">{planObject.name}</CardTitle>
          </div>
            <div>
              <div>
                <CardText className="text-muted product-card-text">Preço mensal {originalPriceMonth}</CardText>
                <CardText className="text-success product-card-discount">
                  {originalPriceYear}
                  <br />
                  <span>Preço anual com desconto</span>
                </CardText>
              </div>
            </div>
          <div className="mt-3">
            <Button variant="success btn-subcription" onClick={confirmSubscription}>Assinar</Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}

export default PlanCard;
import { Col, Row } from 'react-bootstrap';
import { ProductCustomer } from '../../../../components/common/Models';
import '../style.css';
import ProductCard from './ProductCard';

export interface Props {
  productsList: ProductCustomer[];
}

export function ProductList({ productsList }: Props) {
  return (
    <Row>
      {productsList.map((productObject: ProductCustomer) => (
        <Col key={productObject.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard productObject={productObject}></ProductCard>
        </Col>
      ))}
    </Row>
  );
}
import { Col, Row } from 'react-bootstrap';
import { PlanCustomer } from '../../../../components/common/Models';
import '../style.css';
import PlanCard from './PlanCard';

export interface Props {
  planList: PlanCustomer[];
}

export function PlanList({ planList }: Props) {
  return (
    <Row>
      {planList.map((planObject: PlanCustomer) => (
        <Col key={planObject.id} xs={12} sm={6} md={4} lg={3}>
          <PlanCard planObject={planObject}></PlanCard>
        </Col>
      ))}
    </Row>
  );
}
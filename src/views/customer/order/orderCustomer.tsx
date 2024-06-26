import { useEffect, useState } from 'react';
import api from '../../../services/Api';
import 'react-toastify/dist/ReactToastify.css';
import { OrderObjectCustomer } from '../../../components/common/Models';
import './orders.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const OrderCustomer = () => {
  const [orders, setOrders] = useState<OrderObjectCustomer[]>([]);

  const formatDateToBrazilianTime = (createDate: string) => {
    const date = new Date(createDate);
    const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date);
    return formattedDate;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('customer/order');
        setOrders(response.data);
      } catch (error) {
        console.error('Erro ao resgatar pedidos', error);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <main className="primary-container p-3 d-flex justify-content-center align-items-center">
      <div className="card p-5" style={{ maxWidth: '50.75rem'}}>
        <h3 className="text-center">Pedidos</h3>
        <hr />
          <table>
            <thead>
              <tr>
                <th className="header-cell">Pedido</th>
                <th className="header-cell">Data</th>
                <th className="header-cell">Status</th>
                <th className="header-cell">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>
                      <p className="cart-text"># {order.id}</p>
                    </td>
                    <td>
                      <p className="cart-text">{formatDateToBrazilianTime(order.createdAt)}</p>
                    </td>
                    <td>
                      <p className={`cart-text ${order.situation.toLowerCase()}`}>
                        {order.situation}
                      </p>
                    </td>
                    <td>
                      <p className="cart-text">
                        {formatPrice(order.total)}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        <hr />
        <Link
            className="btn bg-black text-white rounded p-2 button-continue-shopp"
            to={ROUTES.CUSTOMER_PRODUCTS}
          >
            <span style={{ marginRight: '6px' }}>⬅️</span>Continuar comprando
        </Link>
      </div>
    </main>
  );
};

export default OrderCustomer;

import { useEffect, useState, useCallback } from 'react';
import api from '../../../services/Api';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import 'react-toastify/dist/ReactToastify.css';
import { CartItem, ProductCustomer, SubscriptionObject } from '../../../components/common/Models';
import ProgressTracker from './components/ProgressTracker';
import Loading from '../../../components/common/Loading';

const FinalizeCartCustomer = () => {
  const [cartProducts, setCartProducts] = useState<ProductCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartItems] = useState<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [subscription, setSubscription] = useState<SubscriptionObject>();
  const navigate = useNavigate();

  const fetchCartProducts = useCallback(async () => {
    try {
      setLoading(true);
      if (cartItems?.length) {
        const productPromises = cartItems.map((item) => api.get(`product/customer/${item.productId}`));
        const productResponses = await Promise.all(productPromises);
        setCartProducts(productResponses.map((response) => response.data));
      }
    } catch (error) {
      console.error('Erro ao buscar produtos do carrinho', error);
    } finally {
      setLoading(false);
    }
  }, [cartItems]);

  useEffect(() => {
    fetchCartProducts();

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

    fetchSubscription();
  }, [fetchCartProducts]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calculateDiscountedPrice = (price: number, discountValue: number, isDiscountPercentage: boolean) => {
    if (isDiscountPercentage) {
      return price - (price * (discountValue / 100));
    } else {
      return price - discountValue;
    }
  };

  const calculateTotalDiscount = () => {
    let totalDiscount = 0;
    cartProducts.forEach(product => {
      const originalPrice = product.price;
      const discountedPrice = calculateDiscountedPrice(originalPrice, product.discountValue, product.isDiscountPercentage);
      totalDiscount += (originalPrice - discountedPrice) * (cartItems.find(item => item.productId === product.id)?.quantity || 0);
    });
    return totalDiscount;
  };

  const calculateSubTotal = () => {
    let subTotal = 0;
    cartProducts.forEach(product => {
      subTotal += product.price * (cartItems.find(item => item.productId === product.id)?.quantity || 0);
    });
    return subTotal;
  };

  const calculateTotal = () => {
    let total = 0;
    cartProducts.forEach(product => {
      const discountedPrice = subscription ? calculateDiscountedPrice(product.price, product.discountValue, product.isDiscountPercentage) : product.price;
      total += discountedPrice * (cartItems.find(item => item.productId === product.id)?.quantity || 0);
    });
    return total;
  };

  const subTotalFormatted = formatPrice(calculateSubTotal());
  const totalDiscountFormatted = subscription ? formatPrice(calculateTotalDiscount()) : 'R$ 0,00';
  const totalFormatted = formatPrice(calculateTotal());


  const handleFinalizeCart = async () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('deliveryAddress');
    await api.post('customer/order', {
      total: calculateTotal(),
      situation: "FINALIZADO"
    });
    navigate(ROUTES.CUSTOMER_POST_CART);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main className="primary-container p-3 d-flex justify-content-center align-items-center">
        <div className="card p-5" style={{ maxWidth: '45.75rem', backgroundColor: '#F4F4F4' }}>
          {cartItems?.length ? (
            <>
              <ProgressTracker currentStep={4} />
              <div className="section-cart border p-3">
                <h4 className="text-center mb-2">Resumo</h4>
                <div className="total-p">
                  <span className="span-title">Sub-total</span>
                  <span>{subscription ? subTotalFormatted : totalFormatted}</span>
                </div>
                <div className="total-p">
                  <span className="span-title">Frete</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="total-p">
                  <span className="span-title">Desconto</span>
                  <span>{totalDiscountFormatted}</span>
                </div>
                <hr />
                <div className="total-p">
                  <span className="total-text">Total</span>
                  <span>{totalFormatted}</span>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <Link
                    className="btn bg-black text-white rounded p-2 buttons-resume"
                    to={ROUTES.CUSTOMER_ADDRESS_CART}
                  >
                    <span style={{ marginRight: '6px' }} className="arrows">⬅️</span>Voltar
                  </Link>
                  <button
                    className="btn bg-black text-white rounded p-2 buttons-resume"
                    type="button"
                    onClick={handleFinalizeCart}
                  >
                    Finalizar<span style={{ marginLeft: '6px' }} className="arrows">➡️</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h4 className="text-center">Não há pedidos no seu carrinho.</h4>
              <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
                <Link
                  className="btn bg-black text-white rounded p-2"
                  style={{ width: '350px' }}
                  to={ROUTES.CUSTOMER_PRODUCTS}
                >
                  <span style={{ marginRight: '6px'}}>⬅️</span>Continuar comprando
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default FinalizeCartCustomer;

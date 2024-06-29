import { useEffect, useState } from 'react';
import api from '../../../services/Api';
import 'react-toastify/dist/ReactToastify.css';
import { CartItem, ProductCustomer, SubscriptionObject } from '../../../components/common/Models';
import './cartCustomer.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import ProgressTracker from './components/ProgressTracker';

const CartCustomer = () => {
  const [cartProducts, setCartProducts] = useState<ProductCustomer[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [subscription, setSubscription] = useState<SubscriptionObject>();

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        if (cartItems?.length) {
          const productPromises = cartItems.map(item => api.get(`product/customer/${item.productId}`));
          const productResponses = await Promise.all(productPromises);
          setCartProducts(productResponses.map((response) => response.data));
        }
      } catch (error) {
        console.error('Erro ao buscar produtos do carrinho', error);
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

    fetchSubscription();
    fetchCartProducts();
  }, [cartItems]);

  const updateLocalStorage = (updatedCartItems: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleIncrementCounter = (productId: string) => {
    const updatedCartItems = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updatedCartItems);
  };

  const handleDecrementCounter = (productId: string) => {
    const index = cartItems.findIndex(item => item.productId === productId);

    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = {
        ...updatedCartItems[index],
        quantity: updatedCartItems[index].quantity - 1
      };
      if (updatedCartItems[index].quantity === 0) {
        updatedCartItems.splice(index, 1);
      }
      updateLocalStorage(updatedCartItems);
    }
  };

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

  return (
    <main className="primary-container p-3 d-flex justify-content-center align-items-center">
      <div className="card p-5" style={{ maxWidth: '75.75rem'}}>
        {cartItems?.length ? (
          <>
            <ProgressTracker currentStep={1} />
            <div className="row">
              <div className="section-cart col-md-8 border p-3">
                <h3>Carrinho</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Produtos</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th>Sub-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((product) => {
                      const cartItem = cartItems.find(item => item.productId === product.id);
                      return (
                        <tr key={product.id}>
                          <td>
                            <p className="cart-text">{product.name}</p>
                          </td>
                          <td>
                            <p className="cart-text">
                              {formatPrice(
                                subscription
                                ? calculateDiscountedPrice(product.price, product.discountValue, product.isDiscountPercentage)
                                : product.price)}
                            </p>
                          </td>
                          <td>
                            <div className="btn-group-counter">
                              <button className="increment-btn" onClick={() => handleIncrementCounter(product.id)}>
                                <p>+</p>
                              </button>
                              <p>{cartItem?.quantity || 0}</p>
                              <button className="decrement-btn" onClick={() => handleDecrementCounter(product.id)}>
                                <p>-</p>
                              </button>
                            </div>
                          </td>
                          <td>
                            <p className="cart-text">
                              {formatPrice((subscription
                                ? calculateDiscountedPrice(product.price, product.discountValue, product.isDiscountPercentage)
                                : product.price) * (cartItem?.quantity || 0))}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Link
                    className="btn bg-black text-white rounded p-2 button-continue-shopp"
                    to={ROUTES.CUSTOMER_PRODUCTS}
                  >
                    <span style={{ marginRight: '6px' }}>⬅️</span>Continuar comprando
                </Link>
              </div>
              <div className="col-md-1"></div>
              <div className="section-cart col-md-3 border p-3" style={{ height: '100%' }}>
                <h4>Resumo</h4>
                  <div className="total-p">
                    <span className="span-title">Sub-total</span>
                    <span>{subTotalFormatted}</span>
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
                  <Link
                    className="btn bg-black text-white rounded p-2 button-total"
                    to={ROUTES.CUSTOMER_ADDRESS_CART}
                  >
                    Endereço de entrega<span style={{ marginLeft: '6px' }}>➡️</span>
                  </Link>
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
                <span style={{ marginRight: '6px' }}>⬅️</span>Continuar comprando
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CartCustomer;

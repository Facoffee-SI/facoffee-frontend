import { useEffect, useState } from 'react';
import api from '../../../services/Api';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/common/Loading';
import { CartItem, ProductCustomer } from '../../../components/common/Models';

const CartCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState<ProductCustomer[]>([]);
  const storageCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

  useEffect(() => {
    setLoading(true);
    const fetchCartProducts = async () => {
      try {
        if (storageCart?.length) {
          const productPromises = storageCart.map(item => api.get(`product/customer/${item.productId}`));
          const productResponses = await Promise.all(productPromises);
          setCartProducts(productResponses.map((response) => response.data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos do carrinho', error);
      }
    };

    fetchCartProducts();
    setLoading(false);
  }, [storageCart]);

  const calculateTotal = () => {
    let total = 0;
    cartProducts.forEach(product => {
      total += product.price * storageCart.find(item => item.productId === product.id)?.quantity || 0;
    });
    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const totalFormatted = formatPrice(calculateTotal());

  return (
    <>
      {loading ? <Loading /> : (
        <>
          <main className="primary-container p-3 d-flex justify-content-center align-items-center">
            <div className="card p-5" style={{ maxWidth: '70.75rem' }}>
              <div className="row">
                <div className="col-md-8">
                  <h2>Carrinho</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{formatPrice(product.price)}</td>
                          <td>
                            {storageCart.find(item => item.productId === product.id)?.quantity || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <h2>Resumo do Pedido</h2>
                  <div className="border p-3">
                    <p>Subtotal: {totalFormatted}</p> 
                    <p>Frete: R$ 0,00</p> 
                    <p>Desconto: R$ 0,00</p> 
                    <hr />
                    <p>Total: {totalFormatted}</p>
                    <button className="btn btn-secondary">Finalizar Compra</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default CartCustomer;
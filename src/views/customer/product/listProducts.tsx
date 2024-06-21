import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/common/Loading';
import { ProductCustomer } from '../../../components/common/Models';
import api from '../../../services/Api';
import { ProductList } from './components/ProductList';
import './style.css';
import { useLocation } from 'react-router-dom';

const ProductsCustomer = () => {
  const location = useLocation();
  const [productsList, setProductsList] = useState<ProductCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (searchQuery) {
          const response = await api.get(`/product/customer`, {
            params: { search: searchQuery }
          });
          setProductsList(response.data);
        }
        else {
          const response = await api.get(`/product/customer`);
          setProductsList(response.data);
        }
      } catch (error) {
        toast.error('Erro ao buscar produtos. Por favor, tente novamente mais tarde.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('Erro ao buscar produtos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <main className="primary-container p-5">
          <div className="secondary-container p-5" style={{ maxWidth: '80.75rem' }}>
            <div className="tertiary-container">
              <h3 className="text-center m-4">Produtos</h3>
              {productsList.length ? (
                <ProductList productsList={productsList} />
              ) : (
                searchQuery ? (
                  <div className="text-center p-4">Não existem produtos correspondentes com o termo: "{searchQuery}".</div>
                ) : (
                  <div className="text-center p-4">Não existem produtos disponíveis.</div>
                )
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ProductsCustomer;
